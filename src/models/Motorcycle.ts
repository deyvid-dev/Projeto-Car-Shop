import { Schema, model as MongoModel } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import GModel from './GModel';

const motorcycleSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

export default class MotorcycleModel extends GModel<IMotorcycle> {
  constructor(model = MongoModel('Motorcycle', motorcycleSchema)) {
    super(model);
  }
}
