import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export const zodErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    res.status(400);
    res.send(err);
  } else {
    next();
  }
};
