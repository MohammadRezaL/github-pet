import type { ErrorHandler } from "hono";
import { GitHubPetError } from "@github-pet/core";
import { HttpError } from "../utils/http-error";

export const errorHandler: ErrorHandler = (error, c) => {
  if (error instanceof GitHubPetError) {
    return c.json(
      {
        error: {
          code: error.code,
          message: error.message
        }
      },
      error.statusCode
    );
  }

  if (error instanceof HttpError) {
    return c.json(
      {
        error: {
          code: "HTTP_ERROR",
          message: error.message
        }
      },
      error.statusCode
    );
  }

  return c.json(
    {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Unexpected server error."
      }
    },
    500
  );
};
