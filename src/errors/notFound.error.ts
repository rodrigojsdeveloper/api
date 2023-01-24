import { ApiError } from "./api.error";

class NotFoundError extends ApiError {
  constructor(name: string) {
    super(`${name} not found`, 404);
  }
}

export { NotFoundError };
