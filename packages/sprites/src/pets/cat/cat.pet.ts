import type { Emotion, Pet } from "@github-pet/core";
import type { SpriteSheet } from "../../sprite.types";
import { CAT_SPRITE_MAP } from "./cat.sprite-map";

export interface PetDefinition {
  id: Pet;
  name: string;
  defaultEmotion: Emotion;
  sprites: Record<Emotion, SpriteSheet>;
}

export const catPet: PetDefinition = {
  id: "cat",
  name: "Pixel Cat",
  defaultEmotion: "waiting",
  sprites: CAT_SPRITE_MAP,
};
