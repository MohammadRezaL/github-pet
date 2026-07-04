import type { Emotion, Pet } from "@github-pet/core";
import { getSpriteSheet } from "./sprite-registry";
import type { Pixel, SpriteFrame, SpriteSheet } from "./sprite.types";

export interface RenderSpriteOptions {
  pet: Pet;
  emotion: Emotion;
  id?: string;
}

function renderPixel(pixel: Pixel, pixelSize: number): string {
  return `<rect x="${pixel.x * pixelSize}" y="${pixel.y * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${pixel.color}"/>`;
}

function renderFrame(frame: SpriteFrame, pixelSize: number, index: number): string {
  const visibility = index === 0 ? "visible" : "hidden";

  return `
    <g id="${frame.id}" visibility="${visibility}">
      ${frame.pixels.map((pixel) => renderPixel(pixel, pixelSize)).join("")}
    </g>
  `;
}

function renderFrameAnimation(sprite: SpriteSheet): string {
  if (sprite.frames.length <= 1) {
    return "";
  }

  const frameCount = sprite.frames.length;
  const totalDuration = (sprite.frameDurationMs * frameCount) / 1000;
  const values = sprite.frames.map((_, index) => (index === 0 ? "visible" : "hidden"));

  return sprite.frames
    .map((frame, index) => {
      const animationValues = values.map((_, valueIndex) =>
        valueIndex === index ? "visible" : "hidden",
      );

      return `
        <animate
          href="#${frame.id}"
          attributeName="visibility"
          values="${animationValues.join(";")}"
          dur="${totalDuration}s"
          repeatCount="indefinite"
          calcMode="discrete"
        />
      `;
    })
    .join("");
}

export function renderSprite(options: RenderSpriteOptions): string {
  const sprite = getSpriteSheet(options.pet, options.emotion);
  const width = sprite.frameSize.width * sprite.pixelSize;
  const height = sprite.frameSize.height * sprite.pixelSize;
  const id = options.id ?? `${options.pet}-${options.emotion}`;

  return `
    <g id="${id}" style="shape-rendering: crispEdges">
      <rect x="0" y="0" width="${width}" height="${height}" fill="transparent"/>
      ${sprite.frames.map((frame, index) => renderFrame(frame, sprite.pixelSize, index)).join("")}
      ${renderFrameAnimation(sprite)}
    </g>
  `;
}
