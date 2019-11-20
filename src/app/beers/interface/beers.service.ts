export interface BeersService {
  getAll(filters: object, page: number, pageSize: number): any;
  getFavourites(): any;
}
