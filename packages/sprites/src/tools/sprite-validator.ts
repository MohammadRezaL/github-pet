import type { SpriteSheet } from "../sprite.types";

export function validateSpriteSheet(sprite: SpriteSheet): void {
  if (sprite.frames.length === 0) {
    throw new Error(`Sprite ${sprite.pet}:${sprite.emotion} must contain at least one frame.`);
  }

  if (sprite.frameSize.width <= 0 || sprite.frameSize.height <= 0) {
    throw new Error(`Sprite ${sprite.pet}:${sprite.emotion} has invalid frame size.`);
  }

  if (sprite.pixelSize <= 0) {
    throw new Error(`Sprite ${sprite.pet}:${sprite.emotion} has invalid pixel size.`);
  }

  for (const frame of sprite.frames) {
    for (const pixel of frame.pixels) {
      if (pixel.x < 0 || pixel.y < 0) {
        throw new Error(`Sprite ${sprite.pet}:${sprite.emotion} contains negative pixel coordinates.`);
      }

      if (pixel.x >= sprite.frameSize.width || pixel.y >= sprite.frameSize.height) {
        throw new Error(`Sprite ${sprite.pet}:${sprite.emotion} contains out-of-bounds pixels.`);
      }
    }
  }
}
