import { IError } from './IError';

interface IService<T> {
  create(obj: T): Promise<T>,
  read(): Promise<T[]>,
  readOne(_id: string): Promise<T | IError | null>,
}

export default IService;
