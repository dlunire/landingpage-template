import type { Token } from "./Type";

/** Tokens capturados durante el análisis léxico */
const tokens: Token[] = [];

/** Posición del cursor del autómata. */
let offset: number = 0;

/** Tamaño en caracteres a ser analizado */
let size: number = 0;

/** Entrada a ser analizada */
let input: string = "";

/** Separador de ruta */
const SEPARATOR: string = "/";

/** Separador de parámetro de consulta */
const QUERY_STRING_SEPARATOR: string = "?";

/**
 * Resuelve la URL base de la aplicación con la siguiente prioridad:
 *
 * 1. **Meta tag `dlroute:base-url`**: si el backend inyectó una etiqueta
 *    `<meta name="dlroute:base-url" content="https://...">` en el HTML,
 *    esa URL se analiza y se usa como base.
 * 2. **URL actual**: si el meta tag no existe o está vacío, se construye
 *    la URL base a partir de `window.location.href`.
 *
 * En ambos casos, la ruta se normaliza pasándola por {@link scanner},
 * que la tokeniza y elimina segmentos vacíos o duplicados.
 *
 * @returns URL base normalizada, sin query string ni hash.
 *          Ejemplo: `"https://example.com/app/v1"`
 *
 * @example
 * // Con <meta name="dlroute:base-url" content="https://api.example.com/v2/">
 * getBaseURL(); // → "https://api.example.com/v2"
 *
 * // Sin meta tag, desde https://example.com/app/dashboard?tab=1
 * getBaseURL(); // → "https://example.com/app/dashboard"
 */
export function getBaseURL(): string {
    tokens.length = 0;
    const currentURL: URL = new URL(location.href);

    scanner(currentURL.pathname);

    /** URL base predeterminada */
    const defaultURL: string = `${currentURL.origin}/${tokens.map(token => token.lexeme).join("/")}`;

    /** URL base recibida por el backend */
    const dlroute: HTMLMetaElement | null = document.querySelector('[name="dlroute:base-url"]');

    if (!(dlroute instanceof HTMLMetaElement)) {
        return defaultURL;
    }

    const content: string = dlroute.content;
    if (!content) return defaultURL;

    const url: URL = new URL(content);
    scanner(url.pathname);

    /** URL Base capturada para el análisis de la ruta base */
    const baseURL: string = `${url.origin}/${tokens.map(token => token.lexeme).join("/")}`;
    
    return baseURL;
}

/**
 * Analiza una URI y la descompone en segmentos usando un autómata de estados finitos.
 *
 * El scanner recorre la URI carácter por carácter, identifica separadores (`/`)
 * y delimitadores, y extrae los segmentos intermedios para su procesamiento.
 * Se detiene al encontrar el inicio de un query string (`?`).
 *
 * @param uri - URI a analizar. Si se omite o está vacía, se usa el valor
 *              actual de la variable global `input`.
 *
 * @example
 * scanner('/users/123/profile');
 * scanner(); // usa el valor previo de `input`
 */
export function scanner(uri: string = ''): void {

    input = `/${uri.trim() === '' ? input : uri}/`;
    size = input.length;

    /** Posición actual del autómata */
    let start: number = 0;

    /** Separador almacenado temporalmente */
    let separator: string | null = null;

    /** Determina si debe consumirse un rango de caracteres */
    let append: boolean = false;

    while (offset < size) {
        if (append) append = false;

        /** Carácter actual */
        const char: string = input[offset];

        /** Siguiente byte a ser analizado */
        const pick: string | null = input[offset + 1] ?? null;

        if (char === QUERY_STRING_SEPARATOR) {
            break;
        }

        if (char === SEPARATOR && pick === SEPARATOR) {
            offset++;
            continue;
        }

        if (char === SEPARATOR && pick !== SEPARATOR) {
            separator = SEPARATOR;
            offset++;
            continue;
        }

        if (separator === SEPARATOR) {
            separator = null;
            start = offset - 1;
        }

        if (start >= offset) continue;
        nextDelimiter();

        offset++;
    }
}

/**
 * Avanza el cursor desde la posición actual hasta el próximo delimitador
 * (`/` o `?`) y registra el segmento encontrado como un token.
 *
 * Este función actúa como sub-autómata dentro de {@link scanner}: una vez
 * que `scanner` identifica el inicio de un segmento, delega en `nextDelimiter`
 * la lectura carácter por carácter hasta encontrar el final del mismo.
 *
 * Comportamiento especial:
 * - Si encuentra un espacio (` `), lo reemplaza por `_` directamente en `input`
 *   para normalizar la URI antes de tokenizar.
 * - Si encuentra `?`, retrocede un paso (`offset--`) para que `scanner`
 *   pueda detectarlo y detener el análisis principal.
 * - El token generado incluye la lexema, su posición de inicio y su longitud.
 *
 * @remarks
 * Modifica las variables globales `offset`, `input` y `tokens`.
 * No debe llamarse directamente fuera del contexto de {@link scanner}.
 */
function nextDelimiter(): void {

    const currentOffset = offset;

    /** Se utilizará solo cuando se encuentre el símbolo `?` */
    let end: number | null = null;

    while (offset < size) {

        /** Carácter actual capturado por el autómata */
        const char: string = input[offset];

        if (char === QUERY_STRING_SEPARATOR) {
            end = offset--;
            break;
        }

        if (char === ' ') {
            input = input.slice(0, offset) + "_" + input.slice(offset + 1);
        }

        if (char === SEPARATOR || char === QUERY_STRING_SEPARATOR) {
            break;
        }

        offset++;
    }

    tokens.push({
        lexeme: input.substring(currentOffset, end ?? offset),
        offset: currentOffset - 1,
        length: offset - currentOffset + (end ? 1 : 0),
    });
}

/**
 * Resuelve la ruta actual relativa a la URL base de la aplicación.
 *
 * Obtiene el pathname de `window.location`, lo normaliza mediante
 * {@link scanner} y elimina el prefijo correspondiente a {@link getBaseURL},
 * devolviendo únicamente la porción de ruta que debe contrastarse
 * contra las rutas registradas en el router.
 *
 * @returns Ruta relativa normalizada, con `/` inicial.
 *          Ejemplo: si la base es `https://example.com/app` y la URL
 *          actual es `https://example.com/app/users/123`, devuelve `"/users/123"`.
 *          Si la ruta actual coincide exactamente con la base, devuelve `"/"`.
 *
 * @example
 * // Base:    https://example.com/app
 * // Actual:  https://example.com/app/dashboard/settings
 * getRoute(); // → "/dashboard/settings"
 */
export function getRoute(): string {

    const baseURL: URL = new URL(getBaseURL());
    scanner(baseURL.pathname);

    /** URI de la URL base */
    const uri: string = tokens.map(token => token.lexeme).join("/");

    const currentURL: URL = new URL(location.href);
    scanner(currentURL.pathname);

    /** URI de la URL base */
    const currentURI: string = tokens.map(token => token.lexeme).join("/");

    console.log({ uri, currentURI, tokens, baseURL , currentURL});
    return "relative";
}