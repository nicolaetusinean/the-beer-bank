import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BeerEntity} from '../beers/beer.entity';
import {BeersService} from '../beers/beers.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {
  @Input() beer: BeerEntity;
  similarBeers: BeerEntity[];
  similarBeersLoaded = false;
  private errors;

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private beersService: BeersService
  ) { }

  ngOnInit() {
    this.getSimilarBeers();
  }

  openBeerModal(beer: BeerEntity) {
    this.activeModal.dismiss(); // close the current modal
    const modalRef = this.modalService.open(BeerDetailsComponent, {});
    modalRef.componentInstance.beer = beer;
  }

  getSimilarBeers() {
    this.similarBeersLoaded = false;

    const filters = {
      abv_gt: Math.round(this.beer.abv) - 2,
      abv_lt: Math.round(this.beer.abv) + 2,
      ibu_gt: Math.round(this.beer.ibu) - 15,
      ibu_lt: Math.round(this.beer.ibu) + 15,
    };

    // get 4 items just in case that the selected beer will be in the returned list
    this.beersService.getAll(filters, 1, 4).subscribe(
      beers => {

        // search for the selected beer and remove it if found
        let i = beers.length - 1;
        for (i; i >= 0; i--) {
          if (this.beer.id === beers[i].id) {
            beers.splice(i, 1);
          }
        }

        // if selected beer was not found in the list, then remove one beer to keep
        // the similar beers list to 3
        if (beers.length > 3) {
          beers.splice(3, 1);
        }

        this.similarBeersLoaded = true;
        this.similarBeers = beers;
      },
      error => this.errors.push(error)
    );
  }
}
