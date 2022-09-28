import IService from '../interfaces/IService';
import { ICar, carSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
// import { ErrorTypes } from '../middlewares/Catolog';

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

  public async readOne(_id: string): Promise<ICar | null> {
    const result = await this._car.readOne(_id);
    console.log(result);
    return result;
  }

  public async delete(_id: string): Promise<ICar | null> {
    const result = await this._car.delete(_id);
    return result;
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    const result = await this._car.update(_id, obj);
    const parsed = carSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return result;
  }
}

export default CarService;
