import { createFrame } from "../../../tools/frame-builder";
import { CAT_PALETTE } from "../cat.palette";
import type { SpriteSheet } from "../../../sprite.types";

const happyFrame1 = createFrame("happy-1", [
  "................",
  "....F......F....",
  "...FFF....FFF...",
  "..FFFFFFFFFFFF..",
  "..FFEFFFFEFFFF..",
  "..FFFFFFFFFFFF..",
  "..FFFFDDFFFFFF..",
  "..FFF....FFFFF..",
  "...FFFFFFFFFF...",
  "....FFFFFFFF....",
  ".....FFFFFF.....",
  "....FF....FF....",
  "...FF......FF...",
  "................",
  "................",
  "................"
], CAT_PALETTE);


const happyFrame2 = createFrame("happy-2", [
  "................",
  "....F......F....",
  "...FFF....FFF...",
  "..FFFFFFFFFFFF..",
  "..FFEFFFFEFFFF..",
  "..FFFFFFFFFFFF..",
  "..FFFFDDFFFFFF..",
  "..FFFFF..FFFFF..",
  "...FFFFFFFFFF...",
  "....FFFFFFFF....",
  ".....FFFFFF.....",
  "....FF....FF....",
  "...FF......FF...",
  "................",
  "................",
  "................"
], CAT_PALETTE);


export const catHappySprite: SpriteSheet = {
  pet: "cat",
  emotion: "happy",
  frameSize: {
    width: 16,
    height: 16,
  },
  pixelSize: 4,
  frameDurationMs: 650,
  frames: [happyFrame1, happyFrame2],
};
