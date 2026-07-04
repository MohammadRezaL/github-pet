import type { PixelGridPalette } from "./pixel-grid";
import { gridToPixels } from "./pixel-grid";
import type { SpriteFrame } from "../sprite.types";

export interface CreateFrameOptions {
  width?: number;
  height?: number;
}

function normalizeRows(
  rows: readonly string[],
  width: number,
  height: number,
): string[] {
  return rows
    .slice(0, height)
    .map((row) => row.slice(0, width).padEnd(width, "."));
}

export function createFrame(
  id: string,
  rows: readonly string[],
  palette: PixelGridPalette,
  options: CreateFrameOptions = {},
): SpriteFrame {
  const width = options.width ?? 16;
  const height = options.height ?? 16;

  return {
    id,
    pixels: gridToPixels(normalizeRows(rows, width, height), palette),
  };
}
