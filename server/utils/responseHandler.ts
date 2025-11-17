import { Response } from "express";

export function sendSuccess(res: Response, data: any, statusCode = 200) {
  return res.status(statusCode).json({
    status: "success",
    data,
  });
}

export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, HttpError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export function throwError(message: string, statusCode = 500): never {
  throw new HttpError(message, statusCode);
}
