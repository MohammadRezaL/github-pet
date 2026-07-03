import { Hono } from "hono";
import type { AppBindings } from "../runtime/runtime.types";

export const metadataRoute = new Hono<AppBindings>();

metadataRoute.get("/:username", (c) => {
  const username = c.req.param("username");

  return c.json({
    username,
    pet: "cat",
    supportedPets: ["cat", "dog", "fox", "panda", "rabbit"],
    supportedThemes: ["default", "dark", "neon", "github", "pastel", "terminal"]
  });
});
