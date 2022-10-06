import { Router } from 'express';
import MotorcycleService from '../services/MotorcycleService';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleController from '../controllers/MotorcycleController';

const route = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

route.put('/:id', (req, res) => motorcycleController.update(req, res));
route.post('/', (req, res) => motorcycleController.create(req, res));
route.get('/', (req, res) => motorcycleController.read(req, res));
route.get('/:id', (req, res) => motorcycleController.readOne(req, res));

export default route;
