import * as sinon from 'sinon';
import { ICar } from '../../../interfaces/ICar';
import CarModel from '../../../models/Car';
import CarService from '../../../services/CarService';
import CarsController from '../../../controllers/CarController';
import { expect } from 'chai';
import { Request, Response } from 'express';
// import { ZodError } from 'zod';

const MockNewCar: ICar = {
  model: "modeloAleatorio",
  year: 2022,
  color: "azul",
  buyValue: 1,
  doorsQty: 2,
  seatsQty: 2,
}

const Mockcar: ICar & { _id:string } = {
  _id: "idaleatorio123",
  model: "modeloAleatorio",
  year: 2022,
  color: "azul",
  buyValue: 1,
  doorsQty: 1,
  seatsQty: 1,
}

const MockListWithId: Array<ICar & { _id: string }> = [
  {
  "_id": "idaleatoriadelista1",
  "model": "modeloAleatorio",
  "year": 2023,
  "color": "branco",
  "status": false,
  "buyValue": 45000,
  "doorsQty": 3,
  "seatsQty": 3,
  },
  {
    "_id": "idaleatoriadelista",
    "model": "modeloAleatorio",
    "year": 2019,
    "color": "vermelho",
    "status": false,
    "buyValue": 80000,
    "doorsQty": 4,
    "seatsQty": 4,
  },
]

describe('Controller Car', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarsController(carService);
  const req = {} as Request;
  const res = {} as Response;
  req.body = MockNewCar;
  before(async () => {
    sinon.stub(carModel, 'create').resolves(Mockcar);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });
  after(()=>{
    sinon.restore();
  })

  it('create car', async () => {
    req.body = MockNewCar;
    await carController.create(req, res);

    const statusStub = res.status as sinon.SinonStub
    const jsonStub = res.json as sinon.SinonStub

    expect(statusStub.calledWith(201)).to.be.true;
    expect(jsonStub.calledWith(Mockcar)).to.be.true;
  });

  it('listar carros', async () => {
    sinon.stub(carService, 'read').resolves(MockListWithId);
    await carController.read(req, res);

    const statusStub = res.status as sinon.SinonStub
    const jsonStub = res.json as sinon.SinonStub

    expect(statusStub.calledWith(200)).to.be.true;
    expect(jsonStub.calledWith(MockListWithId)).to.be.true;
  });
});
