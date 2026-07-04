import { afterEach, describe, expect, it, vi } from "vitest";
import { app } from "../src/app";

interface ErrorBody {
  error: {
    code: string;
    message: string;
  };
}

describe("widget route", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders svg for valid username", async () => {
    const now = new Date().toISOString();

    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const url = String(input);

      if (url.includes("/users/test-user/events/public")) {
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

      if (url.includes("/users/test-user")) {
        return new Response(
          JSON.stringify({
            login: "test-user",
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

    const res = await app.request("/api?username=test-user&emotion=happy");
    const bodyText = await res.text();

    expect(bodyText).toContain("<svg");
    expect(res.status, bodyText).toBe(200);
    expect(res.headers.get("content-type")).toContain("image/svg+xml");
    expect(bodyText).toContain("GitHub Pet for test-user");
    expect(bodyText).toContain("followers:");
    expect(bodyText).toContain("100");
  });

  it("rejects missing username", async () => {
    const res = await app.request("/api");

    expect(res.status).toBe(400);

    const body = (await res.json()) as ErrorBody;

    expect(body.error.code).toBe("INVALID_USERNAME");
  });

  it("rejects unsupported pet", async () => {
    const res = await app.request("/api?username=octocat&pet=dragon");

    expect(res.status).toBe(400);

    const body = (await res.json()) as ErrorBody;

    expect(body.error.code).toBe("INVALID_PET");
  });
});
