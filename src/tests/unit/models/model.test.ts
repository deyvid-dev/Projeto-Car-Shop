import sinon from 'sinon';
import { ICar } from '../../../interfaces/ICar';
import { Model } from 'mongoose';
import CarModel from '../../../models/Car';
import { expect } from 'chai';

const MockNewCar: ICar = {
  model: "modeloAleatorio",
  year: 2022,
  color: "azul",
  buyValue: 1,
  doorsQty: 1,
  seatsQty: 1,
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

describe('Model Car', () => {
  beforeEach(() => {
    sinon.stub(Model, 'create').resolves(Mockcar)
  })

  afterEach(() => {
		sinon.restore();
	});
  const carsModel = new CarModel();
  it('Sucesso', async () => {
    const resolve = await carsModel.create(MockNewCar);
    expect(resolve).to.be.deep.equal(Mockcar)
  });

  it('Sucesso lista de carros', async () => {
    sinon.stub(Model, 'find').resolves(MockListWithId);
    const listCars = await carsModel.read();
    expect(listCars).to.be.deep.eq(MockListWithId);
    expect(listCars).to.be.an('array');
  });

  it('Sucesso carro pelo id', async () => {
    sinon.stub(Model, 'findOne').resolves(Mockcar);

    const getOne = await carsModel.readOne('4edd40c86762e0fb12000003');
    expect(getOne).to.be.deep.eq(Mockcar);
    expect(getOne).to.be.haveOwnProperty('_id');
  });
});
