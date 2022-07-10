import { jwtGuard } from './guards/jwt-auth.guard';
import { Router } from 'express';
import AuthService from './auth.service';
import { loginDto } from './dto/loginDto';

export const router = Router();

router.post('/login', async (req, res, next) => {
  try {
    const newLoginDto = loginDto.parse(req.body);

    // auth user
    const auth = await AuthService.verifyUser(newLoginDto);
    if (auth.verified === false)
      return res.status(401).send({ message: 'pass or username not correct' });

    //send token
    const token = await AuthService.generateToken(auth.user?.id);
    res.send({ token });
  } catch (error) {
    next(error);
  }
});

router.get('/user', jwtGuard, async (req, res, next) => {
  try {
    const user = await AuthService.getAuthenticatedUser(req.user as string);
    return res.send(user);
  } catch (error) {
    next(error);
  }
});
