import type { MiddlewareHandler } from "hono";

export const cacheControlMiddleware: MiddlewareHandler = async (c, next) => {
  await next();

  if (!c.res.headers.has("Cache-Control")) {
    c.res.headers.set("Cache-Control", "public, max-age=60");
  }
};
