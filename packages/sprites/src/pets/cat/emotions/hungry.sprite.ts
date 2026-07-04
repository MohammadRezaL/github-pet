import { createFrame } from "../../../tools/frame-builder";
import { CAT_PALETTE } from "../cat.palette";
import type { SpriteSheet } from "../../../sprite.types";

const hungryFrame1 = createFrame("hungry-1", [
  "................",
  "....F......F....",
  "...FFF....FFF...",
  "..FFFFFFFFFFFF..",
  "..FFEFFFFEFFFF..",
  "..FFFFFFFFFFFF..",
  "..FFFFDDFFFFFF..",
  "..FFF.EEEE.FFF..",
  "...FFFFFFFFFF...",
  "....FFFFFFFF....",
  ".....FFFFFF.....",
  "....FF....FF....",
  "...FF......FF...",
  "......TTTT......",
  "......T..T......",
  "......TTTT......"
], CAT_PALETTE);


const hungryFrame2 = createFrame("hungry-2", [
  "................",
  "....F......F....",
  "...FFF....FFF...",
  "..FFFFFFFFFFFF..",
  "..FFEFFFFEFFFF..",
  "..FFFFFFFFFFFF..",
  "..FFFFDDFFFFFF..",
  "..FFFFEEEEFFFF..",
  "...FFFFFFFFFF...",
  "....FFFFFFFF....",
  ".....FFFFFF.....",
  "....FF....FF....",
  "...FF......FF...",
  ".......TT.......",
  "......TTTT......",
  ".......TT......."
], CAT_PALETTE);


export const catHungrySprite: SpriteSheet = {
  pet: "cat",
  emotion: "hungry",
  frameSize: {
    width: 16,
    height: 16,
  },
  pixelSize: 4,
  frameDurationMs: 650,
  frames: [hungryFrame1, hungryFrame2],
};
