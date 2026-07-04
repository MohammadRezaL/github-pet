import type { GitHubServiceConfig } from "./github.types";

export interface GitHubRequestOptions {
  path: string;
  token?: string;
  userAgent?: string;
}

export class GitHubClientError extends Error {
  public readonly status: number;
  public readonly url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.name = "GitHubClientError";
    this.status = status;
    this.url = url;
  }
}

export async function githubRestRequest<T>(options: GitHubRequestOptions): Promise<T> {
  const url = `https://api.github.com${options.path}`;

  const headers = new Headers({
    Accept: "application/vnd.github+json",
    "User-Agent": options.userAgent ?? "github-pet",
    "X-GitHub-Api-Version": "2022-11-28",
  });

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new GitHubClientError(
      `GitHub REST request failed with status ${response.status}`,
      response.status,
      url,
    );
  }

  return response.json() as Promise<T>;
}

export function createGitHubClient(config: GitHubServiceConfig) {
  return {
    get<T>(path: string): Promise<T> {
      const options: GitHubRequestOptions = {
        path,
      };

      if (config.token) {
        options.token = config.token;
      }

      if (config.userAgent) {
        options.userAgent = config.userAgent;
      }

      return githubRestRequest<T>(options);
    },
  };
}
