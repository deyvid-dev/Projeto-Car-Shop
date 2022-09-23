import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog, ErrorResponseObject } from './Catolog';

const errorHandle:ErrorRequestHandler = (err: Error | ZodError | ErrorResponseObject, req, res) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }
  if (err.message === 'InvalidMongoId') {
    return res.status(400)
      .json({ message: 'Id must have 24 hexadecimal characters' });
  }
  if (err.message === 'Object not found') {
    return res.status(400).json({ message: 'Object not found' });
  }
  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ message });
  }
  console.error(err);
  return res.status(500).json({ message: err.message });
};

export default errorHandle;
