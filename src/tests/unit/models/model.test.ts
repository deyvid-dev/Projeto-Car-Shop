import * as sinon from 'sinon';
import chai from 'chai';
import { ICar } from '../../../interfaces/ICar';
import { Model } from 'mongoose';
import CarModel from '../../../models/Car';
const { expect } = chai;

const MockNewCar: ICar = {
  model: "modeloAleatorio",
  year: 2022,
  color: "azul",
  buyValue: 1,
  doorsQty: 1,
  seatsQty: 1,
}

const Mockcar = {
  _id: "idaleatorio123",
  model: "modeloAleatorio",
  year: 2022,
  color: "azul",
  buyValue: 1,
  doorsQty: 1,
  seatsQty: 1,
}

describe('Model Car', () => {
  before(async() => {
    sinon.stub(Model, 'create').resolves(Mockcar);
  });

  after(() => {
    sinon.restore();
  });
  const carsModel = new CarModel();
  it('Sucesso', async () => {
    const resolve = await carsModel.create(MockNewCar);
    expect(resolve).to.be.deep.equal(Mockcar)
  });
});