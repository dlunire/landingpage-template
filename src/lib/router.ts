import * as parsing from "../parsing/lexer";
import * as routing from "../parsing/base-url";

import type { CurrentRouteType, RouteType } from "../parsing/type";


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

    console.log({ uri, currentTokens });
}