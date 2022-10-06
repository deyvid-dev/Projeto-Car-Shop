import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) {}
  private message = 'Id must have 24 hexadecimal characters';
  private messageObj = 'Object not found';

  public async create(req: Request, res: Response<IMotorcycle>) {
    const { model, year, color, buyValue, category, engineCapacity } = req.body;
    const motorcycle = { model, year, color, buyValue, category, engineCapacity };

    const result = await this._service.create(motorcycle);
    return res.status(201).json(result);
  }

  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response): Promise<void | Response> {
    const { id } = req.params;
    if (id.length !== 24) {
      return res.status(400).json({ error: this.message });
    }
    const result = await this._service.readOne(id);
    if (!result) {
      return res.status(404).json({ error: this.messageObj });
    }
    return res.status(200).json(result);
  }
}