import { NextFunction, Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarsController {
  constructor(private _service: IService<ICar>) { }
  private message = 'Id must have 24 hexadecimal characters';
  private messageObj = 'Object not found';

  public async create(req: Request, res: Response<ICar>) {
    const { model, year, color, buyValue, seatsQty, doorsQty } = req.body;
    const car = { model, year, color, buyValue, seatsQty, doorsQty };

    const result = await this._service.create(car);
    return res.status(201).json(result);
  }

  public async read(_req: Request, res: Response<ICar[]>) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { id } = req.params;
      if (id.length !== 24) {
        return res.status(400).json({ error: this.message });
      }
      const result = await this._service.readOne(id);
      console.log(result);
      if (!result) {
        return res.status(404).json({ error: this.messageObj });
      }
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response): Promise<void | Response> {
    const { id } = req.params;
    if (id.length !== 24) {
      return res.status(400).json({ error: this.message });
    }
    const result = await this._service.delete(id);
    console.log(result);
    
    if (!result && id.length === 24) return res.status(404).json({ error: this.messageObj });

    res.status(204).end();
  }

  public async update(req: Request, res: Response): Promise<void | Response> {
    const { id } = req.params;
    if (id.length !== 24) {
      return res.status(400).json({ error: this.message });
    }
    const result = await this._service.update(id, req.body);
    if (!result && id.length === 24) return res.status(404).json({ error: this.messageObj });
    res.status(200).json(result);
  }
}
