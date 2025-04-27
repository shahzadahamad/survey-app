import { Model, Document } from 'mongoose';
import { IBaseRepository } from '../interfaces/repositories/IBaseRepository';

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(item: T): Promise<T> {
    const newItem = new this.model(item);
    return newItem.save();
  }
}
