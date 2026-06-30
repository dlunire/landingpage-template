import * as parsing from "./lexer";

export function getBaseURL(): string {

    const defaultURL: string = parsing.getURLFromURL().href;

    /** Metadata con la URL que tiene que ser anaizada */
    const metaElement: HTMLMetaElement | null = document.querySelector('meta[name="dlroute:base-url"]');
    
    if (!(metaElement instanceof HTMLMetaElement)) {
        return "";
    }
    return "";
}