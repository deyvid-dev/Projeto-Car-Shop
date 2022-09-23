import IService from '../interfaces/IService';
import { ICar, carSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;
  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = carSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    return this._car.create(obj);
  }

  public async read(): Promise<ICar[]> {
    const result = await this._car.read();
    if (!result) throw new Error('Error');
    return result;
  }

  public async readOne(_id: string): Promise<ICar> {
    if (_id.length !== 24) throw new Error('Id must have 24 hexadecimal characters');
    const result = await this._car.readOne(_id);
    if (!result) throw new Error('Object not found');
    return result;
  }
}

export default CarService;
