import { Router } from 'express';
import CarService from '../services/CarService';
import CarModel from '../models/Car';
import CarController from '../controllers/CarController';

const route = Router();

const cars = new CarModel();
const carsService = new CarService(cars);
const carsController = new CarController(carsService);

route.post('/', (req, res) => carsController.create(req, res));
route.get('/', (req, res) => carsController.read(req, res));

export default route;
