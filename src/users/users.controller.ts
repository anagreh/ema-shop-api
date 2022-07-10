import { createUserDto } from './dto/create-user.dto';
import { Router } from 'express';
import UserService from './users.service';
export const router = Router();

// /api/users
// Find All
router.get('/', async (req, res, next) => {
  try {
    res.send(await UserService.findAll());
  } catch (error) {
    next(error);
  }
});

// Find One
router.get('/:id', async (req, res, next) => {
  try {
    res.send(await UserService.findOne(req.params.id));
  } catch (error) {
    next(error);
  }
});

// Create
router.post('/', async (req, res, next) => {
  try {
    const newUserDto = createUserDto.parse(req.body);
    res.send(await UserService.create(newUserDto));
  } catch (error: any) {
    next(error);
  }
});

// Update
router.patch('/:id', async (req, res, next) => {
  try {
    res.send(await UserService.update(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
});

// Remove
router.delete('/:id', async (req, res, next) => {
  try {
    res.send(UserService.remove(req.params.id));
  } catch (error) {
    next(error);
  }
});
