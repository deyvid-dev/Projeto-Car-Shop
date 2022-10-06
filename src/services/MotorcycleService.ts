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
}

export default MotorcycleService;
