import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BeersComponent} from '../beers/beers.component';
import {BeersService} from '../beers/beers.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FavouriteBeersService} from '../beer-favourites/favourite-beers.service';

@Component({
  selector: 'app-basic-search',
  templateUrl: './basic-search.component.html',
  styleUrls: ['./basic-search.component.scss']
})
export class BasicSearchComponent extends BeersComponent implements OnInit {
  loading = false;

  constructor(protected beersService: BeersService,
              protected modalService: NgbModal,
              protected favouriteBeersService: FavouriteBeersService,
              private route: ActivatedRoute
  ) {
    super(beersService, modalService, favouriteBeersService);
  }

  ngOnInit() {
    this.search();
  }

  /**
   * Get the beers matching searching criteria.
   */
  search() {
    this.loading = true;

    const filters = {
      'beer_name': this.getSearchTermFromQueryParams(),
    };

    this.beersService.getAll(filters).subscribe(
      results => {
        this.beers = results;
        this.loading = false;
      },
      error => {
        this.errors.push(error);
        this.loading = false;
      }
    );
  }

  /**
   * Get the search term from query string parameters.
   */
  getSearchTermFromQueryParams() {
    return this.route.snapshot.queryParamMap.get('searchTerm');
  }

}
