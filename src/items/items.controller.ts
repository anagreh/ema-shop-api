import { createItemDto } from './dto/create-item.dto';
import { Router } from 'express';
import ItemsService from './items.service';
import { jwtGuard } from '../auth/guards';
export const router = Router();

// /api/items
// Create
router.post('/', jwtGuard, async (req, res, next) => {
  try {
    const newItem = createItemDto.parse(req.body);
    const item = await ItemsService.create(newItem, req.user as string);

    res.status(201).send(item);
  } catch (error) {
    next(error);
  }
});

// Find All
router.get('/', async (req, res, next) => {
  try {
    res.send(await ItemsService.findAll());
  } catch (error) {
    next(error);
  }
});

// Find User Item
router.get('/my-items', jwtGuard, async (req, res, next) => {
  try {
    res.send(await ItemsService.findUserItems(req.user as string));
  } catch (error) {
    next(error);
  }
});

// Find One
router.get('/:id', async (req, res, next) => {
  try {
    res.send(await ItemsService.findOne(req.params.id));
  } catch (error) {
    next(error);
  }
});

// Update
router.patch('/:id', jwtGuard, async (req, res, next) => {
  try {
    res.send(
      await ItemsService.update(req.params.id, req.body, req.user as string),
    );
  } catch (error) {
    next(error);
  }
});

// Remove
router.delete('/:id', jwtGuard, async (req, res, next) => {
  try {
    const removedStatus = await ItemsService.remove(
      req.params.id,
      req.user as string,
    );
    if (removedStatus.removed === false)
      res.status(403).send({ message: 'not authorized' });

    res.status(203).send({ message: 'item removed' });
  } catch (error) {
    next(error);
  }
});
