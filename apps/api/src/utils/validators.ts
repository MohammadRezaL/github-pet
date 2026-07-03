import {
  DEFAULT_WIDGET_OPTIONS,
  ERROR_CODES,
  GitHubPetError,
  isEmotion,
  isPet,
  isThemeName,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  type WidgetOptions
} from "@github-pet/core";

const GITHUB_USERNAME_PATTERN = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

function readBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined) {
    return defaultValue;
  }

  return value === "true" || value === "1" || value === "yes";
}

export function parseWidgetOptions(query: Record<string, string | undefined>): WidgetOptions {
  const username = query.username?.trim();

  if (!username) {
    throw new GitHubPetError("Missing required query parameter: username", ERROR_CODES.INVALID_USERNAME, 400);
  }

  if (username.length < USERNAME_MIN_LENGTH || username.length > USERNAME_MAX_LENGTH) {
    throw new GitHubPetError("Invalid GitHub username length.", ERROR_CODES.INVALID_USERNAME, 400);
  }

  if (!GITHUB_USERNAME_PATTERN.test(username)) {
    throw new GitHubPetError("Invalid GitHub username format.", ERROR_CODES.INVALID_USERNAME, 400);
  }

  const pet = query.pet ?? DEFAULT_WIDGET_OPTIONS.pet;
  if (!isPet(pet)) {
    throw new GitHubPetError("Unsupported pet type.", ERROR_CODES.INVALID_PET, 400);
  }

  const theme = query.theme ?? DEFAULT_WIDGET_OPTIONS.theme;
  if (!isThemeName(theme)) {
    throw new GitHubPetError("Unsupported theme.", ERROR_CODES.INVALID_THEME, 400);
  }

  const emotion = query.emotion;
  if (emotion !== undefined && !isEmotion(emotion)) {
    throw new GitHubPetError("Unsupported emotion.", ERROR_CODES.INVALID_EMOTION, 400);
  }

  return {
    username,
    pet,
    theme,
    layout: DEFAULT_WIDGET_OPTIONS.layout,
    emotion,
    hideStats: readBoolean(query.hide_stats, DEFAULT_WIDGET_OPTIONS.hideStats)
  };
}
