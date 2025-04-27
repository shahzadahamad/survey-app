export interface IBaseRepository<T> {
  create(item: T): Promise<T>;
}