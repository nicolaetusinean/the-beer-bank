import {Component, OnInit} from '@angular/core';
import {BeersService} from './beers.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BeerDetailsComponent} from '../beer-details/beer-details.component';
import {BeerEntity} from './beer.entity';
import {FavouriteBeersService} from '../beer-favourites/favourite-beers.service';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {
  beers: BeerEntity[] = [];
  errors = [];
  loading = false;
  page = 1;
  pageSize = 9;

  constructor(
    protected beersService: BeersService,
    protected modalService: NgbModal,
    protected favouriteBeersService: FavouriteBeersService
  ) { }

  ngOnInit() {
    this.getBeersList();
  }

  getBeersList() {
    this.loading = true;

    this.beersService.getAll({}, this.page, this.pageSize).subscribe(
      beers => {
        this.beers = this.beers.concat(beers);
        this.loading = false;
      },
      error => {
        this.errors.push(error);
        this.loading = false;
      }
    );
  }

  openBeerModal(beer: BeerEntity) {
    const modalRef = this.modalService.open(BeerDetailsComponent, {});
    modalRef.componentInstance.beer = beer;
  }

  addOrRemoveToFavourites(beer: BeerEntity) {
    let confirmation;
    if (this.favouriteBeersService.isInList(beer) !== -1) {
      confirmation = this.favouriteBeersService.removeFromList(beer);
      if (confirmation) {
        beer.isInFavouriteList = false;
      }
    } else {
      confirmation = this.favouriteBeersService.addToList(beer);
      if (confirmation) {
        beer.isInFavouriteList = true;
      }
    }
  }

  onScroll() {
    this.page++;
    this.getBeersList();
  }
}
