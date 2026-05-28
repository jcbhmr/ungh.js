import { type } from "arktype";
import { ContentType, Count, Description, ID, OwnerName, RepoFullName, RepoName } from "./github-types.ts";
import { RefName, SHA } from "./git-types.ts";

export const Org = type({
  id: ID,
  name: OwnerName,
  description: Description,
})
export type Org = typeof Org.infer;

export const Repo = type({
  id: ID,
  name: RepoName,
  repo: RepoFullName,
  description: Description,
  createdAt: "string.date.iso",
  updatedAt: "string.date.iso",
  pushedAt: "string.date.iso",
  stars: Count,
  watchers: Count,
  forks: Count,
  defaultBranch: RefName,
})
export type Repo = typeof Repo.infer;

export const Branch = type({
  name: RefName,
  commit: {
    sha: SHA,
    url: "string.url",
  },
  protected: "boolean",
})
export type Branch = typeof Branch.infer;

export const File = type({
  path: "string",
  mode: "string.digits",
  sha: SHA,
  size: Count,
});
export type File = typeof File.infer;

export const Asset = type({
  contentType: ContentType,
  size: Count,
  createdAt: "string.date.iso",
  updatedAt: "string.date.iso",
  downloadCount: Count,
  downloadUrl: "string.url",
});
export type Asset = typeof Asset.infer;

export const Release = type({
  id: ID,
  tag: RefName,
  author: OwnerName,
  name: "string",
  draft: "boolean",
  prerelease: "boolean",
  createdAt: "string.date.iso",
  publishedAt: "string.date.iso",
  assets: Asset.array(),
});
export type Release = typeof Release.infer;

export const StarsRecord = type.Record(RepoFullName, Count);
export type StarsRecord = typeof StarsRecord.infer;

export const OrgContainer = type({
  org: Org
});
export type OrgContainer = typeof OrgContainer.infer;

export const ReposContainer = type({
  repos: Repo.array(),
});
export type ReposContainer = typeof ReposContainer.infer;

export const RepoContainer = type({
  repo: Repo,
});
export type RepoContainer = typeof RepoContainer.infer;

export const BranchesContainer = type({
  branches: Branch.array(),
})
export type BranchesContainer = typeof BranchesContainer.infer;

export const FilesContainer = type({
  meta: {
    sha: SHA,
  },
  files: File.array(),
})
export type FilesContainer = typeof FilesContainer.infer;

export const ReleasesContainer = type({
  releases: Release.array(),
})
export type ReleasesContainer = typeof ReleasesContainer.infer;

export const ReleaseContainer = type({
  release: Release,
})
export type ReleaseContainer = typeof ReleaseContainer.infer;

export const ContributorsContainer = type({
  contributors: Contributor.array(),
})
export type ContributorsContainer = typeof ContributorsContainer.infer;

export const StarsContainer = type({
  totalStars: Count,
  stars: StarsRecord,
})
export type StarsContainer = typeof StarsContainer.infer;

export const MarkdownContainer = type({
  markdown: "string",
  html: "string",
})
export type MarkdownContainer = typeof MarkdownContainer.infer;

const Contributor = type({
  id: ID,
  username: OwnerName,
  contributions: Count,
})
type Contributor = typeof Contributor.infer;
const Markdown = type({
  markdown: "string",
  html: "string"
})
const User = type({
  id: ID,
  username: OwnerName,
  name: "string",
  twitter: type("string").optional(),
  avatar: "string.url",
})
type User = typeof User.infer;

const ErrorContainer = type({
  error: "boolean",
  status: "100 <= number.integer <= 999",
  statusText: "string",
  message: "string",
})
type ErrorContainer = typeof ErrorContainer.infer;