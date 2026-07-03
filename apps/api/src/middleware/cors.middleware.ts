import type { MiddlewareHandler } from "hono";

export const corsMiddleware: MiddlewareHandler = async (c, next) => {
  await next();

  c.res.headers.set("Access-Control-Allow-Origin", "*");
  c.res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  c.res.headers.set("Access-Control-Allow-Headers", "Content-Type");
};
