import { Router } from 'express';
import MotorcycleService from '../services/MotorcycleService';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleController from '../controllers/MotorcycleController';

const route = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

route.post('/', (req, res) => motorcycleController.create(req, res));

export default route;
