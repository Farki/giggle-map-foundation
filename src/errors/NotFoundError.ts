import ApiError from "./ApiError";

export class NotFoundError extends ApiError<"NOT_FOUND"> {
  constructor(message: string) {
    super({
      message,
      statusCode: 404,
      code: "NOT_FOUND",
    });
    this.name = "NotFoundError";
  }
}
