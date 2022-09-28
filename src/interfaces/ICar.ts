import { z } from 'zod';
import { vehicleSchema } from './IVehicle';

export const carSchema = vehicleSchema.extend({
  doorsQty: z.number({
    required_error: 'doorsQty é requerido',
    invalid_type_error: 'Deve ser um valor inteiro',
  }).gte(2, { message: 'Deve ser maior ou igual a 2' })
    .lte(4, { message: 'Deve ser menor ou igual a 4' }),
  seatsQty: z.number({
    required_error: 'seatsQty é requerido',
  }).gte(2, { message: 'Deve ser maior ou igual a 2' })
    .lte(7, { message: 'Deve ser menor ou igual a 7' }),
});

export type ICar = z.infer<typeof carSchema>;
