import { RequestHandler } from 'express';
import AuthService from '../auth.service';

export const jwtGuard: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (token === undefined)
      return res.status(403).send({ message: 'not authorized' });

    const verification = await AuthService.verifyToken(token);

    if (verification.verified) {
      req.user = verification.decode.sub;
      next();
    }
  } catch (error) {
    return res.status(403).send({ message: 'not authorized' });
  }
};
