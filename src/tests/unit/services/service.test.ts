import sinon from 'sinon';
import { ICar } from '../../../interfaces/ICar';
import CarModel from '../../../models/Car';
import CarService from '../../../services/CarService';
import { expect } from 'chai';
import { ZodError } from 'zod';

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

describe('Service Car', () => {
  const carsModel = new CarModel();
  const carService = new CarService(carsModel);

  before(() => {
    sinon.stub(carsModel, 'create').resolves(Mockcar)
  })

  after(() => {
		sinon.restore();
	});

  it('create car', async () => {
    const resolve = await carService.create(MockNewCar);
    expect(resolve).to.be.deep.equal(Mockcar)
  });

  it('falha create car', async () => {
    try {
      await carService.create({} as never);
    } catch (error) {
      expect(error instanceof ZodError).to.be.equal(true);
    }
  })

  it('listar carros', async () => {
    sinon.stub(carsModel, 'read').resolves(MockListWithId);
    const listCars = await carService.read();
    expect(listCars).to.be.deep.eq(MockListWithId);
    expect(listCars).to.be.an('array');
  });

  it('Sucesso carro pelo id', async () => {
    sinon.stub(carsModel, 'readOne').resolves(Mockcar);
    const getOne = await carService.readOne('4edd40c86762e0fb12000003');
    expect(getOne).to.be.deep.eq(Mockcar);
    expect(getOne).to.be.haveOwnProperty('_id');
  });

});
