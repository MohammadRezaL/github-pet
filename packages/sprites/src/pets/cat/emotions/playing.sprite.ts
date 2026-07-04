import { createFrame } from "../../../tools/frame-builder";
import { CAT_PALETTE } from "../cat.palette";
import type { SpriteSheet } from "../../../sprite.types";

const playingFrame1 = createFrame("playing-1", [
  "................",
  "....F......F....",
  "...FFF....FFF...",
  "..FFFFFFFFFFFF..",
  "..FFEFFFFEFFFF..",
  "..FFFFFFFFFFFF..",
  "..FFFFDDFFFFFF..",
  "..FFFFPPPPFFFF..",
  "...FFFFFFFFFF...",
  "....FFFFFFFF....",
  "..T..FFFFFF..T..",
  ".TT.FF....FF.TT.",
  "TT.FF......FF.TT",
  "................",
  "................",
  "................"
], CAT_PALETTE);


const playingFrame2 = createFrame("playing-2", [
  "................",
  "...F........F...",
  "..FFF......FFF..",
  ".FFFFFFFFFFFFFF.",
  ".FFEFFFFEFFFFF..",
  ".FFFFFFFFFFFFFF.",
  ".FFFFFDDFFFFFFF.",
  ".FFFFPPPPFFFFFF.",
  "..FFFFFFFFFFFF..",
  "...FFFFFFFFFF...",
  ".T..FFFFFFFF..T.",
  "TT.FF......FF.TT",
  "................",
  "................",
  "................",
  "................"
], CAT_PALETTE);


export const catPlayingSprite: SpriteSheet = {
  pet: "cat",
  emotion: "playing",
  frameSize: {
    width: 16,
    height: 16,
  },
  pixelSize: 4,
  frameDurationMs: 650,
  frames: [playingFrame1, playingFrame2],
};
