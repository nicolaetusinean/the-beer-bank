import {HttpClient, HttpParams} from '@angular/common/http';
import {BeerEntity} from './beer.entity';
import {Observable, of} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { BeersRepository as IBeersRepository } from './interface/beers.repository';
import {Beer as IBeer} from './interface/beer';

@Injectable({
  providedIn: 'root'
})
export class BeersRepository implements IBeersRepository {
  url = environment.beersAPIUrl;
  apiVersion = 'v2';
  resource = 'beers';

  acceptedFilters = [];

  constructor(private http: HttpClient) {
  }

  /**
   * Makes the API call to get the beers and creates BeerEntity instances from the
   * JSON objects that are returned by the API.
   *
   * @return Observable
   */
  getAll(filters: object = {}, page?: number, pageSize?: number): Observable<IBeer[]> {
    const url = this.url + [this.apiVersion, this.resource].join('/');
    let params = new HttpParams();

    if (!isNaN(page) && !isNaN(pageSize)) {
      params = params.append('page', page.toString());
      params = params.append('per_page', pageSize.toString());
    }

    let filter;
    for (filter of Object.keys(filters)) {
      if (filter === 'ids') {
        params = params.append(filter, filters[filter].join('|'));
        continue;
      }

      params = params.append(filter, filters[filter].toString());
    }

    return this.http.get<IBeer[]>(url, {params: params})
      .pipe(
        map(beers => {
          return beers.map((beer) => new BeerEntity(beer));
        }),
        catchError(this.handleError('trying to get the beers menu', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(operation, error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
