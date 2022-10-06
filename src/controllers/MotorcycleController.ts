import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) {}

  public async create(req: Request, res: Response<IMotorcycle>) {
    const { model, year, color, buyValue, category, engineCapacity } = req.body;
    const motorcycle = { model, year, color, buyValue, category, engineCapacity };

    const result = await this._service.create(motorcycle);
    return res.status(201).json(result);
  }
}