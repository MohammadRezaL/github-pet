import type { ErrorHandler } from "hono";
import { GitHubPetError } from "@github-pet/core";
import { HttpError } from "../utils/http-error";

interface ErrorPayload {
  error: {
    code: string;
    message: string;
  };
}

function errorResponse(payload: ErrorPayload, status: number): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export const errorHandler: ErrorHandler = (error) => {
  if (error instanceof GitHubPetError) {
    return errorResponse(
      {
        error: {
          code: error.code,
          message: error.message,
        },
      },
      error.statusCode,
    );
  }

  if (error instanceof HttpError) {
    return errorResponse(
      {
        error: {
          code: "HTTP_ERROR",
          message: error.message,
        },
      },
      error.statusCode,
    );
  }

  return errorResponse(
    {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "Unexpected server error.",
      },
    },
    500,
  );
};
