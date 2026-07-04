import type { Emotion, Pet } from "@github-pet/core";
import { renderSprite } from "@github-pet/sprites";

export interface RenderPetOptions {
  pet: Pet;
  emotion: Emotion;
}

export function renderPet(options: RenderPetOptions): string {
  return `
    <g transform="translate(46 46) scale(1.55)">
      ${renderSprite({
        pet: options.pet,
        emotion: options.emotion,
        id: "github-pet-sprite",
      })}

      <animateTransform
        attributeName="transform"
        type="translate"
        values="46 46;46 43;46 46"
        dur="1.6s"
        repeatCount="indefinite"
        additive="sum"
      />
    </g>
  `;
}
