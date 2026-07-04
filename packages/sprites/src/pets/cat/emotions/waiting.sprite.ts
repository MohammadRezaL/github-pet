import { createFrame } from "../../../tools/frame-builder";
import { CAT_PALETTE } from "../cat.palette";
import type { SpriteSheet } from "../../../sprite.types";

const waitingFrame1 = createFrame("waiting-1", [
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
  ".....FFFFFF.....",
  "....FF....FF....",
  "...FF......FF...",
  "................",
  "................",
  "................"
], CAT_PALETTE);


const waitingFrame2 = createFrame("waiting-2", [
  "................",
  "....F......F....",
  "...FFF....FFF...",
  "..FFFFFFFFFFFF..",
  "..FFFEFFFFEFFF..",
  "..FFFFFFFFFFFF..",
  "..FFFFDDFFFFFF..",
  "..FFFF....FFFF..",
  "...FFFFFFFFFF...",
  "....FFFFFFFF....",
  ".....FFFFFF.....",
  ".....FF..FF.....",
  "....FF....FF....",
  "................",
  "................",
  "................"
], CAT_PALETTE);


export const catWaitingSprite: SpriteSheet = {
  pet: "cat",
  emotion: "waiting",
  frameSize: {
    width: 16,
    height: 16,
  },
  pixelSize: 4,
  frameDurationMs: 650,
  frames: [waitingFrame1, waitingFrame2],
};
