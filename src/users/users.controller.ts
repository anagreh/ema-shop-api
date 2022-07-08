import { createUserDto } from './dto/create-user.dto';
import { Router } from 'express';
import * as userService from './users.service';

export const router = Router();

// Create
router.post('/', async (req, res, next) => {
  try {
    const newUser = createUserDto.parse(req.body);
    res.send(await userService.create(newUser));
  } catch (error) {
    next(error);
  }
});

// Find All
router.get('/', async (req, res, next) => {
  try {
    res.send(await userService.findAll());
  } catch (error) {
    next(error);
  }
});

// Find One
router.get('/:id', async (req, res, next) => {
  try {
    res.send(await userService.findOne(req.params.id));
  } catch (error) {
    next(error);
  }
});

// Update
router.patch('/:id', async (req, res, next) => {
  try {
    res.send(await userService.update(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
});

// Remove
router.delete('/:id', async (req, res, next) => {
  try {
    res.send(userService.remove(req.params.id));
  } catch (error) {
    next(error);
  }
});
