import { describe, expect, it } from "vitest";
import { createSpeech } from "../src";

describe("createSpeech", () => {
  it("returns milestone speech when milestone exists", () => {
    const speech = createSpeech({
      username: "octocat",
      emotion: "excited",
      milestoneLabel: "100 followers",
    });

    expect(speech.text).toBe("Milestone reached: 100 followers!");
    expect(speech.priority).toBe(100);
    expect(speech.tone).toBe("positive");
  });

  it("returns inactivity speech for critical inactivity", () => {
    const speech = createSpeech({
      username: "octocat",
      emotion: "crying",
      matchedRule: "critical_inactivity",
    });

    expect(speech.text).toBe("I miss my human...");
    expect(speech.tone).toBe("sad");
  });

  it("returns deterministic fallback speech", () => {
    const first = createSpeech({
      username: "octocat",
      emotion: "happy",
    });

    const second = createSpeech({
      username: "octocat",
      emotion: "happy",
    });

    expect(first).toEqual(second);
    expect(first.text.length).toBeGreaterThan(0);
  });
});
