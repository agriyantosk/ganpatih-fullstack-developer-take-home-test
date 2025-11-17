import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const stackLines = err.stack?.split("\n") || [];
  const originLine = stackLines[1]?.trim();
  console.error("Error caught:", {
    message: err.message,
    stack: stackLines,
    line: originLine,
    status: err.statusCode,
  });

  res.status(status).json({
    status: "error",
    message,
  });
};

export default errorHandler;
