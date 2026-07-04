import { createFrame } from "../../../tools/frame-builder";
import { CAT_PALETTE } from "../cat.palette";
import type { SpriteSheet } from "../../../sprite.types";

const lonelyFrame1 = createFrame("lonely-1", [
  "................",
  "....F......F....",
  "...FFF....FFF...",
  "..FFFFFFFFFFFF..",
  "..FFDEFFFFEDFF..",
  "..FFFFFFFFFFFF..",
  "..FFFFDDFFFFFF..",
  "..FFF......FFF..",
  "...FFFF..FFFF...",
  "....FFFFFFFF....",
  ".....FFFFFF.....",
  "....FF....FF....",
  "...FF......FF...",
  "..............B.",
  "................",
  "................"
], CAT_PALETTE);


const lonelyFrame2 = createFrame("lonely-2", [
  "................",
  "....F......F....",
  "...FFF....FFF...",
  "..FFFFFFFFFFFF..",
  "..FFDEFFFFEDFF..",
  "..FFFFFFFFFFFF..",
  "..FFFFDDFFFFFF..",
  "..FFF......FFF..",
  "...FFFF..FFFF...",
  "....FFFFFFFF....",
  ".....FFFFFF.....",
  "....FF....FF....",
  "...FF......FF...",
  ".............B..",
  "..............B.",
  "................"
], CAT_PALETTE);


export const catLonelySprite: SpriteSheet = {
  pet: "cat",
  emotion: "lonely",
  frameSize: {
    width: 16,
    height: 16,
  },
  pixelSize: 4,
  frameDurationMs: 650,
  frames: [lonelyFrame1, lonelyFrame2],
};
