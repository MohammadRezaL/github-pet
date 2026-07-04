import {
  CACHE_TTL,
  getOrSetCached,
  githubActivityCacheKey,
  parseCacheTtlSeconds,
} from "@github-pet/cache";
import { getGitHubActivity } from "@github-pet/github";
import { renderWidget } from "@github-pet/renderer";
import { createSpeech } from "@github-pet/speech";
import { resolvePetState } from "@github-pet/state";
import { Hono } from "hono";
import type { AppBindings } from "../runtime/runtime.types";
import { createRequestContext } from "../runtime/request-context";
import { svgResponse } from "../utils/response";
import { parseWidgetOptions } from "../utils/validators";

export const widgetRoute = new Hono<AppBindings>();

type WidgetRouteContext = Parameters<Parameters<typeof widgetRoute.get>[1]>[0];

async function renderWidgetForRequest(c: WidgetRouteContext, username?: string) {
  const options = parseWidgetOptions({
    ...c.req.query(),
    username: username ?? c.req.query("username"),
  });

  const context = createRequestContext(c.env);

  const ttlSeconds = parseCacheTtlSeconds(
    c.env.CACHE_TTL_SECONDS,
    CACHE_TTL.githubActivitySeconds,
  );

  const cachedActivity = await getOrSetCached(
    context.cache,
    githubActivityCacheKey(options.username),
    ttlSeconds,
    () =>
      getGitHubActivity(options.username, {
        token: c.env.GITHUB_TOKEN,
        userAgent: "github-pet",
      }),
  );

  const state = resolvePetState(cachedActivity.value);
  const emotion = options.emotion ?? state.emotion;

  const speech = createSpeech({
    username: options.username,
    emotion,
    activity: cachedActivity.value,
    matchedRule: state.matchedRule,
    milestoneLabel: state.milestone.label,
  });

  const svg = renderWidget({
    options: {
      ...options,
      emotion,
    },
    generatedAt: new Date(),
    activity: cachedActivity.value,
    speech,
    cacheStatus: cachedActivity.cacheStatus,
  });

  return svgResponse(c, svg);
}

widgetRoute.get("/", async (c) => {
  return renderWidgetForRequest(c);
});

widgetRoute.get("/pet/:username", async (c) => {
  return renderWidgetForRequest(c, c.req.param("username"));
});
