import { ApiError } from "./api.error";

class NotFoundError extends ApiError {
  constructor(message: string) {
    super(`${message} not found`, 404);
  }
}

export { NotFoundError };
