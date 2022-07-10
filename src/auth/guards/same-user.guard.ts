import { RequestHandler } from 'express';

export const sameUserGuard: RequestHandler = (req, res, next) => {
  const currUserId = req.user;
  const oldObjectId = req.params.id;

  if (currUserId === undefined || oldObjectId === undefined)
    res.status(401).send({ message: 'not authService' });

  next();
};
