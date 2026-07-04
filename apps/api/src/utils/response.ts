import type { Context } from "hono";
import { SVG_CONTENT_TYPE } from "@github-pet/core";

export function svgResponse(_c: Context, svg: string): Response {
  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": SVG_CONTENT_TYPE,
      "Cache-Control": "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export function jsonResponse<T>(_c: Context, payload: T, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
