import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  filters = {
    name: ''
  };

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  search() {
    if (!this.filters.name) {
      return;
    }

    this.redirectToBasicSearch({
      'searchTerm': this.filters.name
    });
  }

  redirectToBasicSearch(queryParams: object) {
    this.router.navigate(['/basic-search'], {
      queryParams: queryParams
    });
  }
}
