import type { Pixel } from "../sprite.types";

export type PixelGridPalette = Record<string, string>;

export function gridToPixels(
  rows: readonly string[],
  palette: PixelGridPalette,
): Pixel[] {
  const pixels: Pixel[] = [];

  rows.forEach((row, y) => {
    [...row].forEach((token, x) => {
      if (token === "." || token === " ") {
        return;
      }

      const color = palette[token];

      if (!color) {
        throw new Error(`Unknown sprite palette token: ${token}`);
      }

      pixels.push({
        x,
        y,
        color,
      });
    });
  });

  return pixels;
}
