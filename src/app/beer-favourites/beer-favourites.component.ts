import {Component, OnInit} from '@angular/core';
import {FavouriteBeersService} from './favourite-beers.service';
import {BeerEntity} from '../beers/beer.entity';
import {BeersService} from '../beers/beers.service';
import {BeersComponent} from '../beers/beers.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-beer-favourites',
  templateUrl: './beer-favourites.component.html',
  styleUrls: ['./beer-favourites.component.scss']
})
export class BeerFavouritesComponent extends BeersComponent implements OnInit {
  beers: BeerEntity[];
  loaded = false;

  constructor(protected beersService: BeersService,
              protected modalService: NgbModal,
              protected favouriteBeersService: FavouriteBeersService
  ) {
    super(beersService, modalService, favouriteBeersService);
  }

  ngOnInit() {
    this.getFavouriteBeers();
  }

  getFavouriteBeers() {
    this.loading = true;

    this.beersService.getFavourites().subscribe(
      beers => {
        this.loading = false;
        this.loaded = true;
        this.beers = beers;
      },
      error => {
        this.loading = false;
        this.loaded = true;
        this.errors.push(error);
      }
    );
  }

  removeFromFavourites(beer) {
    const confirmation = this.favouriteBeersService.removeFromList(beer);
    if (confirmation) {
      const beerListIndex = this.findBeerInList(beer);
      if (beerListIndex !== -1) {
        this.beers.splice(beerListIndex, 1);
      }
    }
  }

  /**
   *
   * @return number >=0 if beer is found in the list, -1 otherwise
   */
  private findBeerInList(beer): number {
    let i = 0;
    for (i; i < this.beers.length; i++) {
      if (beer.id === this.beers[i].id) {
        return i;
      }
    }

    return -1;
  }

}
