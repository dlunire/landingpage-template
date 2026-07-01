import * as parsing from "../parsing/lexer";
import type { RouteType } from "../parsing/type";

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

export function route(uri: string) {
    const route: RouteType = parsing.parseRoute(uri);
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