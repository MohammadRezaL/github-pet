import { describe, expect, it } from "vitest";
import { mapGitHubActivity } from "../src/github.mapper";

describe("mapGitHubActivity", () => {
  it("maps GitHub raw activity into internal summary", () => {
    const now = new Date();

    const summary = mapGitHubActivity({
      user: {
        login: "octocat",
        followers: 42,
        public_repos: 8,
        created_at: "2011-01-25T18:44:36Z",
        updated_at: now.toISOString(),
      },
      events: [
        {
          id: "1",
          type: "PushEvent",
          created_at: now.toISOString(),
          payload: {
            commits: [
              {
                sha: "a",
                message: "first",
                url: "https://api.github.com/commit/a",
              },
              {
                sha: "b",
                message: "second",
                url: "https://api.github.com/commit/b",
              },
            ],
          },
        },
      ],
      contributions: {
        data: {
          user: {
            login: "octocat",
            contributionsCollection: {
              contributionCalendar: {
                totalContributions: 10,
                weeks: [
                  {
                    contributionDays: [
                      {
                        date: "2026-01-01",
                        contributionCount: 1,
                      },
                      {
                        date: "2026-01-02",
                        contributionCount: 2,
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    });

    expect(summary).toEqual({
      username: "octocat",
      commitsLast7Days: 2,
      commitsLast30Days: 2,
      currentStreakDays: 2,
      followers: 42,
      publicRepos: 8,
      lastActiveAt: now.toISOString(),
    });
  });

  it("handles missing contribution data", () => {
    const summary = mapGitHubActivity({
      user: {
        login: "octocat",
        followers: 0,
        public_repos: 1,
        created_at: "2011-01-25T18:44:36Z",
        updated_at: "2026-01-01T00:00:00Z",
      },
      events: [],
      contributions: null,
    });

    expect(summary.currentStreakDays).toBe(0);
    expect(summary.lastActiveAt).toBeNull();
  });
});
