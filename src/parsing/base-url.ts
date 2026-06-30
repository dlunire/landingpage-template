import * as parsing from "./lexer";

function getCanonicalURI(): string {

    const metaElement: HTMLElement | null = document.querySelector<HTMLMetaElement>('meta[name="dlroute:base-url"]');

    if (!(metaElement instanceof HTMLMetaElement)) {
        throw new Error('Debe definir «<meta name="dlroute:base-url" content="..."»');
    }

    return parsing.getURIFromURL(metaElement.content);
}

export function getBaseURL(): string {

    const defaultURL: string = parsing.getURLFromURL().href;

    /** Metadata con la URL que tiene que ser anaizada */
    const metaElement: HTMLMetaElement | null = document.querySelector<HTMLMetaElement>('meta[name="dlroute:base-url"]');

    if (!(metaElement instanceof HTMLMetaElement)) {
        return defaultURL;
    }

    return parsing.getURLFromURL(metaElement.content).href;
}

export function getRoute(): string {
    console.log({ route: determineRoute() });
    return determineRoute();
}

function determineRoute() {
    const dlunire: string = 'https://dlunire.dev';

    /** URI actual de la petición */
    const currentURI: string = parsing.getURIFromURL(globalThis.location?.href ?? dlunire);

    /** URI Canónico */
    const uri: string = getCanonicalURI();

    /** Posición del cursor del autómata */
    let offset = 0;

    const { length: size } = uri;

    while (offset < size) {
        if (uri[offset] !== currentURI[offset]) break;
        offset++;
    }

    return currentURI.substring(offset);
}

