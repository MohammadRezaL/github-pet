import { afterEach, describe, expect, it, vi } from "vitest";
import { app } from "../src/app";

describe("widget route", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders svg for valid username", async () => {
    const now = new Date().toISOString();

    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
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

    const res = await app.request("/api?username=octocat");

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("image/svg+xml");

    const svg = await res.text();

    expect(svg).toContain("<svg");
    expect(svg).toContain("GitHub Pet for octocat");
    expect(svg).toContain("followers:");
    expect(svg).toContain("100");
  });

  it("rejects missing username", async () => {
    const res = await app.request("/api");

    expect(res.status).toBe(400);

    const body = await res.json();

    expect(body.error.code).toBe("INVALID_USERNAME");
  });

  it("rejects unsupported pet", async () => {
    const res = await app.request("/api?username=octocat&pet=dragon");

    expect(res.status).toBe(400);

    const body = await res.json();

    expect(body.error.code).toBe("INVALID_PET");
  });
});
