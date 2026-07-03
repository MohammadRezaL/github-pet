import type { WidgetOptions } from "../types/widget.types";

export const DEFAULT_WIDGET_OPTIONS: Omit<WidgetOptions, "username"> = {
  pet: "cat",
  theme: "default",
  layout: "wide",
  hideStats: false
};
