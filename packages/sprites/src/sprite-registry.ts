import type { Emotion, Pet } from "@github-pet/core";
import { catPet, type PetDefinition } from "./pets/cat/cat.pet";
import { dogPet } from "./pets/dog/dog.pet";
import { foxPet } from "./pets/fox/fox.pet";
import { pandaPet } from "./pets/panda/panda.pet";
import { rabbitPet } from "./pets/rabbit/rabbit.pet";
import type { SpriteSheet } from "./sprite.types";
import { validateSpriteSheet } from "./tools/sprite-validator";

const PET_REGISTRY: Record<Pet, PetDefinition> = {
  cat: catPet,
  dog: dogPet,
  fox: foxPet,
  panda: pandaPet,
  rabbit: rabbitPet,
};

export function getPetDefinition(pet: Pet): PetDefinition {
  return PET_REGISTRY[pet];
}

export function getSpriteSheet(pet: Pet, emotion: Emotion): SpriteSheet {
  const definition = getPetDefinition(pet);
  const sprite = definition.sprites[emotion] ?? definition.sprites[definition.defaultEmotion];

  validateSpriteSheet(sprite);

  return sprite;
}
