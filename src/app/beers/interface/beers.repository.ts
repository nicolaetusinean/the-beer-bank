import Repository from '../../api/interface/repository';

export interface BeersRepository extends Repository {
  getAll(filters: object, page: number, pageSize: number): any;
}
