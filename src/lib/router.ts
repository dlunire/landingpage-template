import * as parsing from "../parsing/lexer";
import * as routing from "../parsing/base-url";

import { TokenType, type CurrentRouteType, type Param, type RouteType, type Token, type ValidatedRoute } from "../parsing/type";


/**
 * Tabla interna de rutas registradas por el router.
 *
 * Cada entrada se indexa mediante una clave compuesta por el tipo de la
 * ruta y su URI canónica (`<tipo>-<uri>`), lo que permite distinguir
 * rutas estáticas y parametrizadas aun cuando compartan una misma forma
 * textual.
 *
 * @remarks
 * Esta estructura constituye el registro interno utilizado durante el
 * proceso de construcción del conjunto de rutas. Las claves se generan
 * exclusivamente a partir de la representación canónica producida por el
 * analizador léxico de DLRoute.
 */
const routes: { [x: string]: RouteType } = {};

export function route(uri: string, component: unknown): void {
    const route: RouteType = parsing.parseRoute(uri);

    /**
     * Justo aquí se inyecta el componente, pero la propopiedad `component` tiene
     * tipo como `unknown` para no ligarla necesariamente a Svelte, ya que la 
     * idea es buscar compatibilidad con otras herramientas.
     */
    route.component = component;

    routes[`${route.type}-${route.uri}`] = route;
}

export function resetState(): void {
    for (const index in routes) {
        delete routes[index];
    }
}

export function getRoutes(): { [x: string]: RouteType } {
    return routes;
}

export function dispatch(): void {
    /** Ruta actual capturada */
    const route: CurrentRouteType = routing.getRoute();

    const { uri, tokens: currentTokens } = route;

    /** Ruta registrada que coincide con la URI canónica estática */
    const matchedRoute = routes[`0-${uri}`] ?? null;

    let validatedRoute: ValidatedRoute;


    for (const route in routes) {
        if (route[0] === `${TokenType.Static}`) continue;
        validateRoute(route.substring(2), currentTokens);


    }

    for (const token of currentTokens) {
        console.log({ token, type: token.type });
    }

    // console.log({ matchedRoute, uri, currentTokens, routes });
}

/**
 * Valida si la ruta registrada coincide con la ruta actual en el contexto de 
 * la ruta con parámetros.
 * 
 * @param uri Ruta a ser analizada para verificar coincidencia
 * @returns 
 */
function validateRoute(uri: string, tokens: Token[]): ValidatedRoute {
    const currentTokens: Token[] = parsing.getTokensFromURI(uri);

    const { length: currentLength } = currentTokens;
    const { length } = tokens;

    const param: Param = {};

    if (length !== currentLength) return {
        param,
        uri: null,
        validated: false
    };

    for (const index in tokens) {
        const token: Token = tokens[index];
        const currentToken: Token = currentTokens[index];

        const currentLexeme: string = currentToken.lexeme.substring(1);
        const lexeme: string = token.lexeme;

        if (currentToken.type !== TokenType.Parameter) continue;
        param[currentLexeme] = lexeme;
    }

    return {
        param,
        uri,
        validated: true
    };
}