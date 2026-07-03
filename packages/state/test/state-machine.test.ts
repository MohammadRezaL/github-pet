import type { GitHubActivitySummary } from "@github-pet/core";
import { describe, expect, it } from "vitest";
import { resolvePetState } from "../src";

function activity(overrides: Partial<GitHubActivitySummary>): GitHubActivitySummary {
  return {
    username: "octocat",
    commitsLast7Days: 1,
    commitsLast30Days: 5,
    currentStreakDays: 1,
    followers: 10,
    publicRepos: 5,
    lastActiveAt: "2026-01-10T00:00:00.000Z",
    ...overrides,
  };
}

describe("resolvePetState", () => {
  it("resolves crying for critical inactivity", () => {
    const state = resolvePetState(
      activity({
        commitsLast7Days: 0,
        lastActiveAt: "2025-12-01T00:00:00.000Z",
      }),
      new Date("2026-01-10T00:00:00.000Z"),
    );

    expect(state.emotion).toBe("crying");
    expect(state.matchedRule).toBe("critical_inactivity");
  });

  it("resolves lonely for high inactivity", () => {
    const state = resolvePetState(
      activity({
        commitsLast7Days: 0,
        lastActiveAt: "2025-12-25T00:00:00.000Z",
      }),
      new Date("2026-01-10T00:00:00.000Z"),
    );

    expect(state.emotion).toBe("lonely");
  });

  it("resolves hungry when there are no recent commits", () => {
    const state = resolvePetState(
      activity({
        commitsLast7Days: 0,
        lastActiveAt: "2026-01-09T00:00:00.000Z",
      }),
      new Date("2026-01-10T00:00:00.000Z"),
    );

    expect(state.emotion).toBe("hungry");
  });

  it("resolves excited for very active users", () => {
    const state = resolvePetState(
      activity({
        commitsLast7Days: 12,
        currentStreakDays: 2,
        lastActiveAt: "2026-01-10T00:00:00.000Z",
      }),
      new Date("2026-01-10T00:00:00.000Z"),
    );

    expect(state.emotion).toBe("excited");
  });

  it("resolves playing for strong streaks", () => {
    const state = resolvePetState(
      activity({
        commitsLast7Days: 4,
        currentStreakDays: 8,
        lastActiveAt: "2026-01-10T00:00:00.000Z",
      }),
      new Date("2026-01-10T00:00:00.000Z"),
    );

    expect(state.emotion).toBe("playing");
  });
});
