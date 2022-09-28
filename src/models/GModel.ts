import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../middlewares/Catolog';

abstract class GModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj:T): Promise<T> {
    const result = await this._model.create({ ...obj });
    return result;
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    const result = await this._model.findOne({ _id });
    return result;
  }

  public async read(): Promise<T[]> {
    const result = await this._model.find();
    return result;
  }

  public async delete(_id: string): Promise<T | null> {
    const result = await this._model.findByIdAndDelete(_id);
    return result;
  }

  public async update(_id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.EntityNotFound);
    return this._model.findOneAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }
}

export default GModel;
