import { Router } from 'express';
import CarService from '../services/CarService';
import CarModel from '../models/Car';
import CarController from '../controllers/CarController';

const route = Router();

const cars = new CarModel();
const carService = new CarService(cars);
const carController = new CarController(carService);

route.post('/', (req, res) => carController.create(req, res));
route.get('/', (req, res) => carController.read(req, res));
route.get('/:id', (req, res, next) => carController.readOne(req, res, next));
route.delete('/:id', (req, res) => carController.delete(req, res));
route.put('/:id', (req, res) => carController.update(req, res));

export default route;
