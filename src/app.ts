import express from 'express';
import 'express-async-errors';
import carRoute from './routes/carRoute';
import motorcycleRote from './routes/motorcycleRoute';
import errorHandler from './middlewares/error';

const app = express();
app.use(express.json());
app.use('/cars', carRoute);
app.use('/motorcycles', motorcycleRote);
app.use(errorHandler);

export default app;
