import { Schema, model as MongoModel } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import GModel from './GModel';

const carSchema = new Schema<ICar>({
  status: Boolean,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

export default class CarModel extends GModel<ICar> {
  constructor(model = MongoModel('car', carSchema)) {
    super(model);
  }
}
