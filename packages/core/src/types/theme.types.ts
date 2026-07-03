export const THEMES = [
  "default",
  "dark",
  "neon",
  "github",
  "pastel",
  "terminal"
] as const;

export type ThemeName = (typeof THEMES)[number];

export function isThemeName(value: string): value is ThemeName {
  return THEMES.includes(value as ThemeName);
}
