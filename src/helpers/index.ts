class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

class NotFoundError extends ApiError {
  constructor(message: string) {
    super(`${message} not found`, 404);
  }
}

export { ApiError, BadRequestError, NotFoundError };
