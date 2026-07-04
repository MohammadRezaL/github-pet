import {
  CACHE_TTL,
  getOrSetCached,
  githubActivityCacheKey,
  parseCacheTtlSeconds,
} from "@github-pet/cache";
import { getGitHubActivity, type GitHubServiceConfig } from "@github-pet/github";
import { renderWidget } from "@github-pet/renderer";
import { createSpeech } from "@github-pet/speech";
import { resolvePetState } from "@github-pet/state";
import { Hono, type Context } from "hono";
import type { AppBindings } from "../runtime/runtime.types";
import type { CloudflareEnv } from "../runtime/cloudflare.env";
import { createRequestContext } from "../runtime/request-context";
import { svgResponse } from "../utils/response";
import { parseWidgetOptions } from "../utils/validators";

export const widgetRoute = new Hono<AppBindings>();

type WidgetRouteContext<Path extends string = string> = Context<AppBindings, Path>;

function getSafeEnv<Path extends string>(c: WidgetRouteContext<Path>): CloudflareEnv {
  return (c.env ?? {}) as CloudflareEnv;
}

function createGitHubConfig(env: CloudflareEnv): GitHubServiceConfig {
  const config: GitHubServiceConfig = {
    userAgent: "github-pet",
  };

  if (env.GITHUB_TOKEN) {
    config.token = env.GITHUB_TOKEN;
  }

  return config;
}

async function renderWidgetForRequest<Path extends string>(
  c: WidgetRouteContext<Path>,
  username?: string,
): Promise<Response> {
  const env = getSafeEnv(c);

  const options = parseWidgetOptions({
    ...c.req.query(),
    username: username ?? c.req.query("username"),
  });

  const context = createRequestContext(env);

  const ttlSeconds = parseCacheTtlSeconds(
    env.CACHE_TTL_SECONDS,
    CACHE_TTL.githubActivitySeconds,
  );

  const cachedActivity = await getOrSetCached(
    context.cache,
    githubActivityCacheKey(options.username),
    ttlSeconds,
    () => getGitHubActivity(options.username, createGitHubConfig(env)),
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
