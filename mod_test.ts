import Ungh from "./mod.ts";

let ungh: Ungh | undefined;
Deno.test.beforeEach(() => {
  ungh = new Ungh();
})
Deno.test.afterEach(() => {
  ungh = undefined;
})

const owner = "denoland";
const repo = "deno";
const repos = "denoland/deno";
const name = "ry"
const query = "deno";

Deno.test("orgsOwner: /orgs/{owner}", async () => {
  const result = await ungh!.orgsOwner("denoland");
  console.log(result);
})

Deno.test("orgsOwnerRepos: /orgs/{owner}/repos", async () => {
  const result = await ungh!.orgsOwnerRepos(owner);
  console.log(result);
})

Deno.test("reposOwnerRepoBranches: /repos/{owner}/{repo}/branches", async () => {
  const result = await ungh!.reposOwnerRepoBranches(owner, repo);
  console.log(result);
})

Deno.test("reposOwnerRepoFilesBranch: /repos/{owner}/{repo}/files/{branch}", async () => {
  const result = await ungh!.reposOwnerRepoFilesBranch(owner, repo, "main");
  console.log(result);
})

Deno.test("reposOwnerRepoFilesBranchPath: /repos/{owner}/{repo}/files/{branch}/{...path}", async () => {
  const result = await ungh!.reposOwnerRepoFilesBranchPath(owner, repo, "main", "README.md");
  console.log(result);
})

Deno.test("reposOwnerRepoReleases: /repos/{owner}/{repo}/releases", async () => {
  const result = await ungh!.reposOwnerRepoReleases(owner, repo);
  console.log(result);
})

Deno.test("reposOwnerRepoReleasesLatest: /repos/{owner}/{repo}/releases/latest", async () => {
  const result = await ungh!.reposOwnerRepoReleasesLatest(owner, repo);
  console.log(result);
})

