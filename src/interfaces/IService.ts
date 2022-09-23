interface IService<T> {
  create(obj: T): Promise<T>,
  read(): Promise<T[]>,
}

export default IService;
