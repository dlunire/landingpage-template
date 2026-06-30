import * as parsing from "../parsing/lexer";

function route(uri: string) {
    uri = parsing.getURIFromURI(uri);
}