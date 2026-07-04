import { createFrame } from "../../../tools/frame-builder";
import { CAT_PALETTE } from "../cat.palette";
import type { SpriteSheet } from "../../../sprite.types";

const angryFrame1 = createFrame("angry-1", [
  "................",
  "....F......F....",
  "...FFF....FFF...",
  "..FFFFFFFFFFFF..",
  "..FFEEDFFDEEFF..",
  "..FFFFFFFFFFFF..",
  "..FFFFDDFFFFFF..",
  "..FFF.RRRR.FFF..",
  "...FFFFFFFFFF...",
  "....FFFFFFFF....",
  ".....FFFFFF.....",
  "....FF....FF....",
  "...FF......FF...",
  "................",
  "................",
  "................"
], CAT_PALETTE);


const angryFrame2 = createFrame("angry-2", [
  "................",
  "...F........F...",
  "..FFF......FFF..",
  ".FFFFFFFFFFFFFF.",
  ".FFEEDFFDEEFF...",
  ".FFFFFFFFFFFFFF.",
  ".FFFFFDDFFFFFFF.",
  ".FFF.RRRRRR.FFF.",
  "..FFFFFFFFFFFF..",
  "...FFFFFFFFFF...",
  "....FFFFFFFF....",
  "...FF......FF...",
  "..FF........FF..",
  "................",
  "................",
  "................"
], CAT_PALETTE);


export const catAngrySprite: SpriteSheet = {
  pet: "cat",
  emotion: "angry",
  frameSize: {
    width: 16,
    height: 16,
  },
  pixelSize: 4,
  frameDurationMs: 650,
  frames: [angryFrame1, angryFrame2],
};
