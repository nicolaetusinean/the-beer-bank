import { Component, OnInit } from '@angular/core';
import {BeersService} from '../beers/beers.service';
import {BeersComponent} from '../beers/beers.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FavouriteBeersService} from '../beer-favourites/favourite-beers.service';

@Component({
  selector: 'app-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent extends BeersComponent implements OnInit {
  filters = {
    ibu_lt: null,
    ibu_gt: null,
    abv_lt: null,
    abv_gt: null,
    ebc_lt: null,
    ebc_gt: null,
    brewed_after: {
      month: null,
      year: null,
    },
    brewed_before: {
      month: null,
      year: null,
    },
  };
  months = [];
  years  = [];
  submitted = false;
  loading = false;

  constructor(protected beersService: BeersService,
              protected modalService: NgbModal,
              protected favouriteBeersService: FavouriteBeersService
  ) {
    super(beersService, modalService, favouriteBeersService);

    this.months = this.range(1, 12);
    this.years  = this.range(2019, 1900);
  }

  ngOnInit() {}

  /**
   * Get the beers matching searching criteria.
   */
  search() {
    this.loading = true;
    this.submitted = true;

    const filters = this.evaluateFilters();

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

  clearResultsList() {
    this.beers = [];
    this.submitted = false;
  }

  /**
   * Empty filters are removed and date is formatted.
   */
  private evaluateFilters(): object {
    const filters = {
      ...this.filters,
      brewed_after: null,
      brewed_before: null
    };
    delete filters['brewed_after'];
    delete filters['brewed_before'];

    for (const filter of Object.keys(filters)) {
      if (filters[filter] === undefined || filters[filter] === null) {
        delete filters[filter];
      }
    }

    if (this.filters.brewed_before['year']) {
      if (!this.filters.brewed_before['month']) {
        this.filters.brewed_before['month'] = 12;
      }

      filters.brewed_before = [this.filters.brewed_before['month'], this.filters.brewed_before['year']].join('-');
    }

    if (this.filters.brewed_after['year']) {
      if (!this.filters.brewed_after['month']) {
        this.filters.brewed_after['month'] = 1;
      }

      filters.brewed_after = [this.filters.brewed_after['month'], this.filters.brewed_after['year']].join('-');
    }

    return filters;
  }

  /**
   * Generate an array of numbers.
   */
  private range(start: number, end: number): number[] {
    const result = [];
    let i = start;

    if (start === end) {
      result.push(i);
    } else if (start > end) {
      for (i; i >= end; i--) {
        result.push(i);
      }
    } else {
      for (i; i <= end; i++) {
        result.push(i);
      }
    }

    return result;
  }
}
