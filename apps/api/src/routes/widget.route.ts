import { Hono } from "hono";
import { renderWidget } from "@github-pet/renderer";
import type { AppBindings } from "../runtime/runtime.types";
import { svgResponse } from "../utils/response";
import { parseWidgetOptions } from "../utils/validators";

export const widgetRoute = new Hono<AppBindings>();

widgetRoute.get("/", (c) => {
  const options = parseWidgetOptions(c.req.query());

  const svg = renderWidget({
    options,
    generatedAt: new Date()
  });

  return svgResponse(c, svg);
});

widgetRoute.get("/pet/:username", (c) => {
  const username = c.req.param("username");
  const options = parseWidgetOptions({
    ...c.req.query(),
    username
  });

  const svg = renderWidget({
    options,
    generatedAt: new Date()
  });

  return svgResponse(c, svg);
});
