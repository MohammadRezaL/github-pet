import type { Emotion, Pet } from "@github-pet/core";

export interface Pixel {
  x: number;
  y: number;
  color: string;
}

export interface SpriteFrame {
  id: string;
  pixels: Pixel[];
}

export interface SpriteSheet {
  pet: Pet;
  emotion: Emotion;
  frameSize: {
    width: number;
    height: number;
  };
  pixelSize: number;
  frames: SpriteFrame[];
  frameDurationMs: number;
}
