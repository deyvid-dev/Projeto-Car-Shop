import IService from '../interfaces/IService';
import { IMotorcycle, motoSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorclycle: IModel<IMotorcycle>;
  constructor(model: IModel<IMotorcycle>) {
    this._motorclycle = model;
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = motoSchema.safeParse(obj);
    
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._motorclycle.create(obj);
  }

  public async read(): Promise<IMotorcycle[]> {
    const result = await this._motorclycle.read();
    if (!result) throw new Error('Error');
    return result;
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    const result = await this._motorclycle.readOne(_id);
    return result;
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    const result = await this._motorclycle.delete(_id);
    return result;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    const result = await this._motorclycle.update(_id, obj);
    const parsed = motoSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
    return result;
  }
}

export default MotorcycleService;
