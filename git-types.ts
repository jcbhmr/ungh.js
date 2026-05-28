import { type } from "arktype";

const twoConsecutiveDotsRegExp = /\.\./;
// deno-lint-ignore no-control-regex
const disallowedCharacters = /[\x00-\x1F\x7F ~^:]/;
const multipleConsecutiveSlashesRegExp = /\/{2,}/;
export const RefName = type("string").narrow((s, ctx): s is `${string}/${string}` => {
    if (twoConsecutiveDotsRegExp.test(s)) {
        return ctx.reject("not contain consecutive dots");
    }

    if (disallowedCharacters.test(s)) {
        return ctx.reject("not contain ASCII control characters, space, tilde, caret, or colon");
    }

    if (multipleConsecutiveSlashesRegExp.test(s)) {
        return ctx.reject("not contain multiple consecutive slashes");
    }

    const components = s.split("/");
    if (components.length < 2) {
        return ctx.reject("contain at least one '/' character");
    }

    for (const component of components) {
        // TODO
        void component;
    }

    return true
})
export type RefName = typeof RefName.infer;

export const SHA = type("/[0-9a-f]{40}/")
export type SHA = typeof SHA.infer;
