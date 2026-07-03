import { Hono } from "hono";
import type { AppBindings } from "../runtime/runtime.types";

export const healthRoute = new Hono<AppBindings>();

healthRoute.get("/", (c) => {
  return c.json({
    ok: true,
    service: "github-pet-api",
    status: "healthy"
  });
});
