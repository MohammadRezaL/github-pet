import { Hono } from "hono";
import type { AppBindings } from "../runtime/runtime.types";

export const debugRoute = new Hono<AppBindings>();

debugRoute.get("/state", (c) => {
  return c.json({
    enabled: true,
    message: "Debug route placeholder. Full state engine will be added later."
  });
});
