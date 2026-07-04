import type { PetDefinition } from "../cat/cat.pet";
import { catPet } from "../cat/cat.pet";

export const foxPet: PetDefinition = {
  ...catPet,
  id: "fox",
  name: "Pixel Fox",
};
