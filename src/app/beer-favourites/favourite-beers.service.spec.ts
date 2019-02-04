import {TestBed} from '@angular/core/testing';

import {FavouriteBeersService} from './favourite-beers.service';

describe('FavouriteBeersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavouriteBeersService = TestBed.get(FavouriteBeersService);
    expect(service).toBeTruthy();
  });
});
