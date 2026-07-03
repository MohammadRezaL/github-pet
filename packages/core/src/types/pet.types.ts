export const PETS = ["cat", "dog", "fox", "panda", "rabbit"] as const;

export type Pet = (typeof PETS)[number];

export function isPet(value: string): value is Pet {
  return PETS.includes(value as Pet);
}
