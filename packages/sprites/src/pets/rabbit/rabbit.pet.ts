import type { PetDefinition } from "../cat/cat.pet";
import { catPet } from "../cat/cat.pet";

export const rabbitPet: PetDefinition = {
  ...catPet,
  id: "rabbit",
  name: "Pixel Rabbit",
};
