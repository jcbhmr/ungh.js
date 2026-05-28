import { type } from "arktype"

export const ID = type("number.safe & number.integer > 0")
export type ID = typeof ID.infer;

export const OwnerName = type("/^[a-zA-Z\\d](?:[a-zA-Z\\d]|-(?=[a-zA-Z\\d])){0,38}$/")
export type OwnerName = typeof OwnerName.infer;

export const RepoName = type("/^[a-zA-Z\\d._-]+$/")
export type RepoName = typeof RepoName.infer;

export const RepoFullName = type("string").narrow((s, ctx): s is `${string}/${string}` => {
    const parts = s.split("/", 2);
    if (parts.length !== 2) {
        return ctx.reject(`'{owner}/{repo}' format`)
    }
    const [owner, repo] = parts;
    const ownerResult = OwnerName(owner);
    const repoResult = RepoName(repo);
    if (ownerResult instanceof type.errors) {
        return ctx.reject(`${ownerResult}`);
    }
    if (repoResult instanceof type.errors) {
        return ctx.reject(`${repoResult}`);
    }
    return true;
})
export type RepoFullName = typeof RepoFullName.infer;

export const Description = type("string | null")
export type Description = typeof Description.infer;

export const Count = type("number.safe & number.integer >= 0")
export type Count = typeof Count.infer;

export const ContentType = type("string")
export type ContentType = typeof ContentType.infer;
