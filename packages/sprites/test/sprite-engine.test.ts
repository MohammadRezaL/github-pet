import { describe, expect, it } from "vitest";
import { getSpriteSheet, renderSprite } from "../src";

describe("sprite engine", () => {
  it("returns a cat sprite sheet for every emotion", () => {
    const emotions = [
      "happy",
      "excited",
      "sleeping",
      "waiting",
      "sad",
      "lonely",
      "hungry",
      "angry",
      "crying",
      "waving",
      "eating",
      "playing",
    ] as const;

    for (const emotion of emotions) {
      const sprite = getSpriteSheet("cat", emotion);

      expect(sprite.pet).toBe("cat");
      expect(sprite.emotion).toBe(emotion);
      expect(sprite.frames.length).toBeGreaterThan(0);
    }
  });

  it("renders sprite SVG rectangles", () => {
    const svg = renderSprite({
      pet: "cat",
      emotion: "happy",
    });

    expect(svg).toContain("<rect");
    expect(svg).toContain("shape-rendering: crispEdges");
    expect(svg).toContain("<animate");
  });
});
