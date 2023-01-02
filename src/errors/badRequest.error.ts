import { ApiError } from "./api.error";

class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

export { BadRequestError };
