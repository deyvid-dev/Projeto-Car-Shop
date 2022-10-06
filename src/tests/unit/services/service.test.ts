import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';

// import { ErrorTypes } from '../../../middlewares/Catolog';
import CarsService from '../../../services/CarService';
import CarModel from '../../../models/Car';
import { ICar } from '../../../interfaces/ICar';

const MockcarId = {
  _id: "idaleatorio123",
  model: "modeloAleatorio",
  year: 2022,
  color: "azul",
  buyValue: 1,
  doorsQty: 1,
  seatsQty: 1,
}

const MockNewCar: ICar = {
  model: "modeloAleatorio",
  year: 2022,
  color: "azul",
  buyValue: 1,
  doorsQty: 1,
  seatsQty: 1,
}

describe('Car Service', () => {
  const carModel = new CarModel();
  const carsService = new CarsService(carModel);

  beforeEach(() => {
    sinon.stub(carModel, 'create').resolves(MockcarId)
  })

  afterEach(() => {
		sinon.restore();
	});

  describe('creating a car', () => {
    it('successfully created', async () => {
      const carCreated = await carsService.create(MockNewCar);

      expect(carCreated).to.be.deep.equal(MockcarId);
    })

    it('Failure created', async () => {
      let error;
      try {
        await carsService.create({
          model: '',
          year: 0,
          color: '',
          buyValue: 0,
          doorsQty: 0,
          seatsQty: 0
        });
      } catch (err) {
        error = err
      }

      expect(error).to.be.instanceOf(ZodError);
    })
  })
  describe('Listando carros', () => {
    it('successfully list', async () => {
      const list = await carsService.read();
      expect(list).to.be.deep.equal([MockcarId])
    })
  })

  describe('Listando carros pelo id', () => {
    it('successfully list with id', async () => {
      const list = await carsService.readOne('idaleatorio123');
      expect(list).to.be.deep.equal(MockcarId);
    })
  })
})