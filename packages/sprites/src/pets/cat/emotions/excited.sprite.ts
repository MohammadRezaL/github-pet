import { createFrame } from "../../../tools/frame-builder";
import { CAT_PALETTE } from "../cat.palette";
import type { SpriteSheet } from "../../../sprite.types";

const excitedFrame1 = createFrame("excited-1", [
  "................",
  "...F........F...",
  "..FFF......FFF..",
  ".FFFFFFFFFFFFFF.",
  ".FFEFF..FFEFFFF.",
  ".FFFFFFFFFFFFFF.",
  ".FFFFFDDFFFFFFF.",
  ".FFF.PPPPPP.FFF.",
  "..FFFFFFFFFFFF..",
  "...FFFFFFFFFF...",
  "....FFFFFFFF....",
  "...FF.FFFF.FF...",
  "..FF..FFFF..FF..",
  "................",
  "................",
  "................"
], CAT_PALETTE);


const excitedFrame2 = createFrame("excited-2", [
  "................",
  "...F........F...",
  "..FFF......FFF..",
  ".FFFFFFFFFFFFFF.",
  ".FBEFF..FFEBFFF.",
  ".FFFFFFFFFFFFFF.",
  ".FFFFFDDFFFFFFF.",
  ".FF.PPPPPPPP.FF.",
  "..FFFFFFFFFFFF..",
  "...FFFFFFFFFF...",
  "..F.FFFFFFFF.F..",
  ".FF..FFFFFF..FF.",
  "................",
  "................",
  "................",
  "................"
], CAT_PALETTE);


export const catExcitedSprite: SpriteSheet = {
  pet: "cat",
  emotion: "excited",
  frameSize: {
    width: 16,
    height: 16,
  },
  pixelSize: 4,
  frameDurationMs: 650,
  frames: [excitedFrame1, excitedFrame2],
};
