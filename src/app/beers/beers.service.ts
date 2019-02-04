import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BeerEntity} from './beer.entity';
import {catchError, map, tap} from 'rxjs/operators';
import {BeersRepository} from './beers.repository';
import {FavouriteBeersService} from '../beer-favourites/favourite-beers.service';

@Injectable({
  providedIn: 'root'
})
export class BeersService {

  constructor(private beersRepository: BeersRepository, private favouriteBeersService: FavouriteBeersService) {
  }

  /**
   * Get the list of beers.
   *
   * @param markFavourites If set to true, then BeerEntity flag `isInFavouriteList`
   *                       will be set true/false to each BeerEntity instance.
   */
  getAll(filters?: object, page?: number, pageSize?: number, markFavourites = true): Observable<BeerEntity[]> {
    return this.beersRepository.getAll(filters, page, pageSize).pipe(
      map(beers => {
          if (!markFavourites) {
            return beers;
          }

          let i = 0;
          for (i; i < beers.length; i++) {
            if (this.favouriteBeersService.isInList(beers[i]) !== -1) {
              beers[i].isInFavouriteList = true;
            }
          }

          return beers;
        }
      ));
  }

  /**
   * Get the list of favourite beers. Will return an empty array if there are no favourite beers yet.
   */
  getFavourites(): Observable<BeerEntity[]> {
    const ids = this.favouriteBeersService.getList();
    if (ids.length === 0) {
      return Observable.create(observer => {
        observer.onNext([]);
        observer.onCompleted();
      });
    }

    return this.getAll({ids: ids});
  }
}
