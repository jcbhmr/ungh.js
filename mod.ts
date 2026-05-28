import { BranchName } from "./git-types.ts";
import { OwnerName, RepoFullName, RepoName } from "./github-types.ts";
import { BranchesContainer, ContributorsContainer, FilesContainer, MarkdownContainer, OrgContainer, ReleaseContainer, ReleasesContainer, RepoContainer, ReposContainer, StarsContainer } from "./ungh-types.ts";
import { fetchOk, fetchOkJSON } from "./utils.ts";

export interface Options {
  baseURL?: string | URL;
}

/**
 * Routes:
 * 
 * - `GET /orgs/{owner}`
 * - `GET /orgs/{owner}/repos`
 * - `GET /repos/{owner}/{repo}`
 * - `GET /repos/{owner}/{repo}/branches`
 * - `GET /repos/{owner}/{repo}/files/{branch}`
 * - `GET /repos/{owner}/{repo}/files/{branch}/{...path}`
 * - `GET /repos/{owner}/{repo}/releases`
 * - `GET /repos/{owner}/{repo}/releases/latest`
 * - `GET /repos/{owner}/{repo}/contributors`
 * - `GET /repos/{owner}/{repo}/readme`
 * - `GET /stars/{...repos}`
 * - `GET /users/{name}`
 * - `GET /users/{name}/repos`
 * - `GET /users/find/{query}`
 */
export default class Ungh {
  #baseURL: Readonly<URL>;
  constructor(options: Readonly<Options> = {}) {
    this.#baseURL = (() => {
      if (options.baseURL !== undefined) {
        return new URL(options.baseURL) as Readonly<URL>;
      } else {
        return new URL("https://ungh.cc/") as Readonly<URL>;
      }
    })()
  }

  async org(ownerRaw: OwnerName): Promise<OrgContainer> {
    const owner = OwnerName.assert(ownerRaw);
    const ownerEncoded = encodeURIComponent(owner);
    const url = new URL(`orgs/${ownerEncoded}`, this.#baseURL) as Readonly<URL>;
    const data = await fetchOkJSON(url);
    return OrgContainer.assert(data);
  }

  async orgRepos(ownerRaw: OwnerName): Promise<ReposContainer> {
    const owner = OwnerName.assert(ownerRaw);
    const ownerEncoded = encodeURIComponent(owner);
    const url = new URL(`orgs/${ownerEncoded}/repos`, this.#baseURL) as Readonly<URL>;
    const data = await fetchOkJSON(url);
    return ReposContainer.assert(data);
  }

  async repo(ownerRaw: OwnerName, repoRaw: RepoName): Promise<RepoContainer> {
    const owner = OwnerName.assert(ownerRaw);
    const repo = RepoName.assert(repoRaw);
    const ownerEncoded = encodeURIComponent(owner);
    const repoEncoded = encodeURIComponent(repo);
    const url = new URL(`repos/${ownerEncoded}/${repoEncoded}`, this.#baseURL) as Readonly<URL>;
    const data = await fetchOkJSON(url);
    return RepoContainer.assert(data);
  }

  async repoBranches(ownerRaw: OwnerName, repoRaw: RepoName): Promise<BranchesContainer> {
    const owner = OwnerName.assert(ownerRaw);
    const repo = RepoName.assert(repoRaw);
    const ownerEncoded = encodeURIComponent(owner);
    const repoEncoded = encodeURIComponent(repo);
    const url = new URL(`repos/${ownerEncoded}/${repoEncoded}/branches`, this.#baseURL) as Readonly<URL>;
    const data = await fetchOkJSON(url);
    return BranchesContainer.assert(data);
  }

  async repoFiles(ownerRaw: OwnerName, repoRaw: RepoName, branchRaw: BranchName): Promise<FilesContainer> {
    const owner = OwnerName.assert(ownerRaw);
    const repo = RepoName.assert(repoRaw);
    const branch = BranchName.assert(branchRaw);
    const ownerEncoded = encodeURIComponent(owner);
    const repoEncoded = encodeURIComponent(repo);
    const branchEncoded = encodeURIComponent(branch);
    const url = new URL(`repos/${ownerEncoded}/${repoEncoded}/files/${branchEncoded}`, this.#baseURL) as Readonly<URL>;
    const data = await fetchOkJSON(url);
    return FilesContainer.assert(data);
  }

  async repoFile(ownerRaw: OwnerName, repoRaw: RepoName, branchRaw: BranchName, path: string): Promise<File> {
    const owner = OwnerName.assert(ownerRaw);
    const repo = RepoName.assert(repoRaw);
    const branch = BranchName.assert(branchRaw);
    const ownerEncoded = encodeURIComponent(owner);
    const repoEncoded = encodeURIComponent(repo);
    const branchEncoded = encodeURIComponent(branch);
    const fileName = path.split("/").at(-1);
    const pathEncoded = path.split("/").map(c => encodeURIComponent(c)).join("/");
    const url = new URL(`repos/${ownerEncoded}/${repoEncoded}/files/${branchEncoded}/${pathEncoded}`, this.#baseURL) as Readonly<URL>;
    const response = await fetchOk(url);
    const blob = await response.blob();
    return new File([blob], fileName ?? "", blob);
  }

  async repoReleases(ownerRaw: OwnerName, repoRaw: RepoName): Promise<ReleasesContainer> {
    const owner = OwnerName.assert(ownerRaw);
    const repo = RepoName.assert(repoRaw);
    const ownerEncoded = encodeURIComponent(owner);
    const repoEncoded = encodeURIComponent(repo);
    const url = new URL(`repos/${ownerEncoded}/${repoEncoded}/releases`, this.#baseURL) as Readonly<URL>;
    const data = await fetchOkJSON(url);
    return ReleasesContainer.assert(data);
  }

  async repoReleaseLatest(ownerRaw: OwnerName, repoRaw: RepoName): Promise<ReleaseContainer> {
    const owner = OwnerName.assert(ownerRaw);
    const repo = RepoName.assert(repoRaw);
    const ownerEncoded = encodeURIComponent(owner);
    const repoEncoded = encodeURIComponent(repo);
    const url = new URL(`repos/${ownerEncoded}/${repoEncoded}/releases/latest`, this.#baseURL) as Readonly<URL>;
    const data = await fetchOkJSON(url);
    return ReleaseContainer.assert(data);
  }

  async repoContributors(ownerRaw: OwnerName, repoRaw: RepoName): Promise<ContributorsContainer> {
    const owner = OwnerName.assert(ownerRaw);
    const repo = RepoName.assert(repoRaw);
    const ownerEncoded = encodeURIComponent(owner);
    const repoEncoded = encodeURIComponent(repo);
    const url = new URL(`repos/${ownerEncoded}/${repoEncoded}/contributors`, this.#baseURL) as Readonly<URL>;
    const data = await fetchOkJSON(url);
    return ContributorsContainer.assert(data);
  }

  async repoReadme(ownerRaw: OwnerName, repoRaw: RepoName): Promise<MarkdownContainer> {
    const owner = OwnerName.assert(ownerRaw);
    const repo = RepoName.assert(repoRaw);
    const ownerEncoded = encodeURIComponent(owner);
    const repoEncoded = encodeURIComponent(repo);
    const url = new URL(`repos/${ownerEncoded}/${repoEncoded}/readme`, this.#baseURL) as Readonly<URL>;
    const data = await fetchOkJSON(url);
    return MarkdownContainer.assert(data);
  }

  async stars(reposRaw: RepoFullName[]): Promise<StarsContainer> {
    const repos = RepoFullName.array().assert(reposRaw);
    const reposEncoded = repos.map(repo => repo.split("/").map(c => encodeURIComponent(c)).join("/")).join("+");
    const url = new URL(`stars/${reposEncoded}`, this.#baseURL) as Readonly<URL>;
    const data = await fetchOkJSON(url);
    return StarsContainer.assert(data);
  }

  async user(nameRaw: OwnerName): Promise<UserContainer> {
    const name = OwnerName.assert(nameRaw);
    const nameEncoded = encodeURIComponent(name);
    const url = new URL(`users/${nameEncoded}`, this.#baseURL) as Readonly<URL>;
    const data = await fetchOkJSON(url);
    return UserContainer.assert(data);
  }

  async userRepos(nameRaw: OwnerName): Promise<ReposContainer> {
    const name = OwnerName.assert(nameRaw);
    const nameEncoded = encodeURIComponent(name);
    const url = new URL(`users/${nameEncoded}/repos`, this.#baseURL) as Readonly<URL>;
    const data = await fetchOkJSON(url);
    return ReposContainer.assert(data);
  }

  async userFind(query: string): Promise<UserContainer> {
    const queryEncoded = encodeURIComponent(query);
    const url = new URL(`users/find/${queryEncoded}`, this.#baseURL) as Readonly<URL>;
    const data = await fetchOkJSON(url);
    return UserContainer.assert(data);
  }
}