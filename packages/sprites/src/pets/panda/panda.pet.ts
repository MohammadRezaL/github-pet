import type { PetDefinition } from "../cat/cat.pet";
import { catPet } from "../cat/cat.pet";

export const pandaPet: PetDefinition = {
  ...catPet,
  id: "panda",
  name: "Pixel Panda",
};
