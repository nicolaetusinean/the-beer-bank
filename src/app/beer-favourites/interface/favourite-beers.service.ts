import {Beer} from '../../beers/interface/beer';

export interface FavouriteBeersService {
  addToList(beer: Beer): boolean;
  isInList(beer: Beer): number;
  removeFromList(beer: Beer): boolean;
  getList(): string[];
}
