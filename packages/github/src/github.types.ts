import type { GitHubActivitySummary } from "@github-pet/core";

export interface GitHubServiceConfig {
  token?: string;
  userAgent?: string;
}

export interface GitHubUserRestResponse {
  login: string;
  followers: number;
  public_repos: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubEventRestResponse {
  id: string;
  type: string;
  created_at: string;
  repo?: {
    id: number;
    name: string;
  };
  payload?: {
    commits?: Array<{
      sha: string;
      message: string;
      url: string;
    }>;
  };
}

export interface GitHubGraphQLContributionResponse {
  data?: {
    user?: {
      login: string;
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
            }>;
          }>;
        };
      };
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

export interface GitHubRawActivity {
  user: GitHubUserRestResponse;
  events: GitHubEventRestResponse[];
  contributions: GitHubGraphQLContributionResponse | null;
}

export type { GitHubActivitySummary };
