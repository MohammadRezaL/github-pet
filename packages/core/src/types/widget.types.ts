import type { GitHubActivitySummary } from "./activity.types";
import type { Emotion } from "./emotion.types";
import type { Pet } from "./pet.types";
import type { ThemeName } from "./theme.types";

export type WidgetLayout = "compact" | "wide" | "card";

export interface WidgetOptions {
  username: string;
  pet: Pet;
  theme: ThemeName;
  layout: WidgetLayout;
  emotion?: Emotion;
  hideStats: boolean;
}

export interface RenderWidgetInput {
  options: WidgetOptions;
  generatedAt: Date;
  activity?: GitHubActivitySummary;
  cacheStatus?: "hit" | "miss" | "disabled";
}
