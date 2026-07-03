import { Hono } from "hono";
import type { AppBindings } from "./runtime/runtime.types";
import { cacheControlMiddleware } from "./middleware/cache-control.middleware";
import { corsMiddleware } from "./middleware/cors.middleware";
import { errorHandler } from "./middleware/error.middleware";
import { rateLimitMiddleware } from "./middleware/rate-limit.middleware";
import { debugRoute } from "./routes/debug.route";
import { healthRoute } from "./routes/health.route";
import { metadataRoute } from "./routes/metadata.route";
import { widgetRoute } from "./routes/widget.route";

export const app = new Hono<AppBindings>();

app.onError(errorHandler);

app.use("*", corsMiddleware);
app.use("*", cacheControlMiddleware);
app.use("*", rateLimitMiddleware);

app.route("/health", healthRoute);
app.route("/api", widgetRoute);
app.route("/api/metadata", metadataRoute);
app.route("/debug", debugRoute);

app.notFound((c) => {
  return c.json(
    {
      error: {
        code: "NOT_FOUND",
        message: "Route not found."
      }
    },
    404
  );
});
