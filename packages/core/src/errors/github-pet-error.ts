import type { ErrorCode } from "./error-codes";

export class GitHubPetError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;

  constructor(message: string, code: ErrorCode, statusCode = 400) {
    super(message);
    this.name = "GitHubPetError";
    this.code = code;
    this.statusCode = statusCode;
  }
}
