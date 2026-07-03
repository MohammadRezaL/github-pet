import { afterEach, describe, expect, it, vi } from "vitest";
import { getGitHubActivity } from "../src/github.service";

describe("getGitHubActivity", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches user and public events without GraphQL token", async () => {
    const now = new Date().toISOString();

    const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const url = String(input);

      if (url.includes("/users/octocat/events/public")) {
        return new Response(
          JSON.stringify([
            {
              id: "1",
              type: "PushEvent",
              created_at: now,
              payload: {
                commits: [
                  {
                    sha: "abc",
                    message: "commit",
                    url: "https://api.github.com/commit/abc",
                  },
                ],
              },
            },
          ]),
          { status: 200 },
        );
      }

      if (url.includes("/users/octocat")) {
        return new Response(
          JSON.stringify({
            login: "octocat",
            followers: 100,
            public_repos: 10,
            created_at: "2011-01-25T18:44:36Z",
            updated_at: now,
          }),
          { status: 200 },
        );
      }

      return new Response("not found", { status: 404 });
    });

    const activity = await getGitHubActivity("octocat");

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(activity.username).toBe("octocat");
    expect(activity.commitsLast7Days).toBe(1);
    expect(activity.followers).toBe(100);
  });
});
