import {Injectable} from '@angular/core';
import {BeerEntity} from '../beers/beer.entity';
import {LocalStorageService} from 'ngx-webstorage';
import {Beer} from '../beers/interface/beer';
import {FavouriteBeersService as IFavouriteBeersService} from './interface/favourite-beers.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteBeersService implements IFavouriteBeersService {
  localstorageId = 'favouriteBeersIds';
  private idsSeparator = '|';

  constructor(private localStorageService: LocalStorageService) { }

  addToList(beer: Beer): boolean {
    const beerListIndex = this.isInList(beer);

    if (beerListIndex > -1) {
      return true;
    }

    const favouriteBeersIds = this.getList();
    favouriteBeersIds.push(beer.id.toString());

    this.storeList(favouriteBeersIds);

    return true;
  }

  /**
   * @return number (position index in list or -1 if not found)
   */
  isInList(beer: Beer): number {
    const favouriteBeersIds = this.getList();
    const beerIndex = favouriteBeersIds.indexOf(beer.id.toString());

    return beerIndex;
  }

  removeFromList(beer: BeerEntity): boolean {
    const beerListIndex = this.isInList(beer);

    if (beerListIndex === -1) {
      return true;
    }

    const favouriteBeersIds = this.getList();
    favouriteBeersIds.splice(beerListIndex, 1);

    this.storeList(favouriteBeersIds);

    return true;
  }

  /**
   * Gets the beers ids from local storage;
   */
  getList(): string[] {
    const favouriteBeersIds = this.localStorageService.retrieve(this.localstorageId);

    if (typeof favouriteBeersIds !== 'string') {
      return [];
    }

    return favouriteBeersIds.split(this.idsSeparator);
  }

  /**
   * Saves list in local storage.
   */
  private storeList(list: string[]) {
    const listAsString = list.join(this.idsSeparator);
    this.localStorageService.store('favouriteBeersIds', listAsString);
  }
}
