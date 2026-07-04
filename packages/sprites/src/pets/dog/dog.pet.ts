import type { PetDefinition } from "../cat/cat.pet";
import { catPet } from "../cat/cat.pet";

export const dogPet: PetDefinition = {
  ...catPet,
  id: "dog",
  name: "Pixel Dog",
};
