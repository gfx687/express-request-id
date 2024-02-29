import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export type Options = {
  generator?: (request: Request) => string;
  headerName?: string;
  setResponseHeader?: boolean;
};

export function requestID({
  generator = (_) => randomUUID(),
  headerName = "X-Request-Id",
  setResponseHeader = true,
}: Options = {}) {
  return function (request: Request, response: Response, next: NextFunction) {
    const oldValue = request.get(headerName);
    const id = oldValue === undefined ? generator(request) : oldValue;

    if (setResponseHeader) {
      response.set(headerName, id);
    }

    request.id = id;

    next();
  };
}
