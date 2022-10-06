// import { expect } from 'chai';
// import * as sinon from 'sinon';
// import { NextFunction, Request, Response } from 'express';

// import { ErrorTypes } from '../../../middlewares/Catolog';
// import CarsController from '../../../controllers/CarController';
// import CarsService from '../../../services/CarService';
// import CarModel from '../../../models/Car';
// import { ICar } from '../../../interfaces/ICar';

// const MockNewCar: ICar = {
//   model: "modeloAleatorio",
//   year: 2022,
//   color: "azul",
//   buyValue: 1,
//   doorsQty: 1,
//   seatsQty: 1,
// }

// describe('Car Service', () => {
//   const carModel = new CarModel();
//   const carsService = new CarsService(carModel);
//   const carsController = new CarsController(carsService);

//   const req = {} as Request;
//   const res = {} as Response;

//   beforeEach(() => {
//     sinon.stub(carsService, 'create').resolves(MockNewCar);

//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//   })

//   afterEach(() => {
// 		sinon.restore();
// 	});

//   describe('creating a car', () => {
//     it('successfully created', async () => {
//       req.body = MockNewCar;
//       await carsController.create(req, res);

//       expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
//       expect((res.json as sinon.SinonStub).calledWith(MockNewCar)).to.be.true;
//     })
//   })
// })