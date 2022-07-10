import { UpdateItemDto } from './dto/update-item.dto';
import { ItemModel } from './models/Item';
import { CreateItemDto } from './dto/create-item.dto';

export default abstract class ItemsService {
  static findAll = async () => {
    return await ItemModel.find();
  };

  static findUserItems = async (userId: string) => {
    return await ItemModel.find({ user_id: userId });
  };

  static findOne = async (id: string) => {
    const item = await ItemModel.findById(id);
    if (!item) throw { status: 400, message: 'not found' };
    return item;
  };

  static create = async (createItemDto: CreateItemDto, userId: string) => {
    console.log(createItemDto.imgs);

    const newItem = new ItemModel({ ...createItemDto, user_id: userId });
    const item = await newItem.save();
    return item;
  };

  static update = async (
    id: string,
    updateItemDto: UpdateItemDto,
    userId: string,
  ) => {
    const item = await ItemModel.findByIdAndUpdate(id, updateItemDto, {
      new: true,
    });
    if (!item) throw { status: 400, message: 'not found' };
    if (item.user_id.toString() !== userId)
      throw { status: 403, message: 'not authorized' };

    return item;
  };

  static remove = async (itemId: string, userId: string) => {
    const item = await ItemModel.findById(itemId).exec();

    if (item?.user_id.toString() !== userId) return { removed: false };

    await item.remove();
    return { removed: true };
  };
}
