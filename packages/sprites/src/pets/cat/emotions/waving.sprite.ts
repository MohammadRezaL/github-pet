import { createFrame } from "../../../tools/frame-builder";
import { CAT_PALETTE } from "../cat.palette";
import type { SpriteSheet } from "../../../sprite.types";

const wavingFrame1 = createFrame("waving-1", [
  "................",
  "....F......F....",
  "...FFF....FFF...",
  "..FFFFFFFFFFFF..",
  "..FFEFFFFEFFFF..",
  "..FFFFFFFFFFFF..",
  "..FFFFDDFFFFFF..",
  "..FFFF....FFFF..",
  "...FFFFFFFFFF...",
  "....FFFFFFFF....",
  "..F..FFFFFF.....",
  ".FF.FF....FF....",
  "FF.FF......FF...",
  "................",
  "................",
  "................"
], CAT_PALETTE);


const wavingFrame2 = createFrame("waving-2", [
  "............F...",
  "....F.....FFF...",
  "...FFF...FFFF...",
  "..FFFFFFFFFFFF..",
  "..FFEFFFFEFFFF..",
  "..FFFFFFFFFFFF..",
  "..FFFFDDFFFFFF..",
  "..FFFF....FFFF..",
  "...FFFFFFFFFF...",
  "....FFFFFFFF....",
  ".....FFFFFF..F..",
  "....FF....FF.FF.",
  "...FF......FF.FF",
  "................",
  "................",
  "................"
], CAT_PALETTE);


export const catWavingSprite: SpriteSheet = {
  pet: "cat",
  emotion: "waving",
  frameSize: {
    width: 16,
    height: 16,
  },
  pixelSize: 4,
  frameDurationMs: 650,
  frames: [wavingFrame1, wavingFrame2],
};
