import { computedMIMEType } from "whatwg-mimetype"

export async function fetchOk(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const response = await fetch(input, init);
    if (!response.ok) {
        throw new DOMException(`${response.url} returned ${response.status}`, "FetchError");
    }
    return response;
}

export async function fetchOkJSON(input: RequestInfo | URL, init?: RequestInit): Promise<unknown> {
    const response = await fetchOk(input, init);
    const bytes = await response.bytes();
    const mimeType = computedMIMEType(bytes, {
        contentTypeHeader: response.headers.get("Content-Type") ?? undefined,
        noSniff: toASCIILowerCase(response.headers.get("X-Content-Type-Options") ?? "") === "nosniff"
    })
    if (mimeType.essence !== "application/json") {
        throw new DOMException(`${response.url} mismatched MIME type: expected '${"application/json"}', got '${mimeType}'`, "FetchError");
    }
    return await response.json();
}

// deno-lint-ignore no-control-regex
const nonASCIIRegExp = /[^\x00-\x7F]/;

export function isASCII(string: string): boolean {
    return !nonASCIIRegExp.test(string);
}

export function toASCIILowerCase(string: string): string {
    if (isASCII(string)) {
        return string.toLowerCase();
    }
    let result = "";
    for (let i = 0; i < string.length; i++) {
        const c = string[i];
        result += ("A" <= c && c <= "Z") ? c.toLowerCase() : c;
    }
    return result;
}
