import { createFrame } from "../../../tools/frame-builder";
import { CAT_PALETTE } from "../cat.palette";
import type { SpriteSheet } from "../../../sprite.types";

const sleepingFrame1 = createFrame("sleeping-1", [
  "................",
  "....F......F....",
  "...FFF....FFF...",
  "..FFFFFFFFFFFF..",
  "..FFEEFFFFEEFF..",
  "..FFFFFFFFFFFF..",
  "..FFFFDDFFFFFF..",
  "..FFFF....FFFF..",
  "...FFFFFFFFFF...",
  "....FFFFFFFF....",
  ".....FFFFFF.....",
  "....FF....FF....",
  "...FF......FF...",
  "............BBB.",
  ".............B..",
  "............BBB."
], CAT_PALETTE);


const sleepingFrame2 = createFrame("sleeping-2", [
  "................",
  "....F......F....",
  "...FFF....FFF...",
  "..FFFFFFFFFFFF..",
  "..FFEEFFFFEEFF..",
  "..FFFFFFFFFFFF..",
  "..FFFFDDFFFFFF..",
  "..FFFF....FFFF..",
  "...FFFFFFFFFF...",
  "....FFFFFFFF....",
  ".....FFFFFF.....",
  "....FF....FF....",
  "...FF......FF...",
  "...........BBB..",
  "............B...",
  "...........BBB.."
], CAT_PALETTE);


export const catSleepingSprite: SpriteSheet = {
  pet: "cat",
  emotion: "sleeping",
  frameSize: {
    width: 16,
    height: 16,
  },
  pixelSize: 4,
  frameDurationMs: 650,
  frames: [sleepingFrame1, sleepingFrame2],
};
