import type { Emotion } from "@github-pet/core";
import type { SpriteSheet } from "../../sprite.types";
import { catAngrySprite } from "./emotions/angry.sprite";
import { catCryingSprite } from "./emotions/crying.sprite";
import { catEatingSprite } from "./emotions/eating.sprite";
import { catExcitedSprite } from "./emotions/excited.sprite";
import { catHappySprite } from "./emotions/happy.sprite";
import { catHungrySprite } from "./emotions/hungry.sprite";
import { catLonelySprite } from "./emotions/lonely.sprite";
import { catPlayingSprite } from "./emotions/playing.sprite";
import { catSadSprite } from "./emotions/sad.sprite";
import { catSleepingSprite } from "./emotions/sleeping.sprite";
import { catWaitingSprite } from "./emotions/waiting.sprite";
import { catWavingSprite } from "./emotions/waving.sprite";

export const CAT_SPRITE_MAP: Record<Emotion, SpriteSheet> = {
  happy: catHappySprite,
  excited: catExcitedSprite,
  sleeping: catSleepingSprite,
  waiting: catWaitingSprite,
  sad: catSadSprite,
  lonely: catLonelySprite,
  hungry: catHungrySprite,
  angry: catAngrySprite,
  crying: catCryingSprite,
  waving: catWavingSprite,
  eating: catEatingSprite,
  playing: catPlayingSprite,
};
