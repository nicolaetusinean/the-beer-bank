import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BeerDetailsComponent} from '../beer-details/beer-details.component';
import {BeerEntity} from './beer.entity';
import {FavouriteBeersService} from '../beer-favourites/favourite-beers.service';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss']
})
export class BeerComponent implements OnInit {
  @Input() beer: BeerEntity;
  @Output() addedToFavourites = new EventEmitter<string>();
  @Output() removedFromFavourites = new EventEmitter<string>();

  constructor(
    protected modalService: NgbModal,
    protected favouriteBeersService: FavouriteBeersService
  ) { }

  ngOnInit() {}


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
        this.removedFromFavourites.emit();
      }
    } else {
      confirmation = this.favouriteBeersService.addToList(beer);
      if (confirmation) {
        beer.isInFavouriteList = true;
        this.addedToFavourites.emit();
      }
    }
  }
}
