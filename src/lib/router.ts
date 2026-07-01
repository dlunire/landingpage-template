import * as parsing from "../parsing/lexer";
import * as routing from "../parsing/base-url";

import { TokenType, type CurrentRouteType, type Dispatch, type Param, type RouteType, type Token, type ValidatedRoute } from "../parsing/type";


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

export function dispatch(): Dispatch {
    /** Ruta actual capturada */
    const route: CurrentRouteType = routing.getRoute();

    const { uri, tokens: currentTokens } = route;

    /** Información adicional de rutas validadas */
    let validatedRoute: ValidatedRoute | null = null;

    /** Ruta registrada que coincide con la URI canónica estática */
    const matchedRoute = routes[`0-${uri}`] ?? null;

    if (matchedRoute) {
        return {
            validated: {
                param: {},
                uri: `0-${matchedRoute.uri}`,
                validated: true
            },

            component: matchedRoute.component
        };
    }

    for (const route in routes) {
        if (route[0] === `${TokenType.Static}`) continue;
        validatedRoute = getValidateRoute(route, currentTokens);
        if (validatedRoute.validated) break;
    }

    if (validatedRoute && validatedRoute.uri) {
        return {
            validated: validatedRoute,
            component: routes[validatedRoute.uri].component
        }
    }

    return {
        validated:  {
            param: {},
            uri: null,
            validated: false
        },

        component: null
    }
}

/**
 * Valida si la ruta registrada coincide con la ruta actual en el contexto de 
 * la ruta con parámetros.
 * 
 * @param uri Ruta a ser analizada para verificar coincidencia
 * @returns 
 */
function getValidateRoute(uri: string, tokens: Token[]): ValidatedRoute {
    const currentTokens: Token[] = parsing.getTokensFromURI(uri.substring(2));

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