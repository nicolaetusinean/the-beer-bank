import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeersComponent } from './beers/beers.component';
import { BeerComponent } from './beers/beer.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { BeerFavouritesComponent } from './beer-favourites/beer-favourites.component';
import { AdvancedSearchComponent } from './search/advanced-search.component';
import { SearchBarComponent } from './search/search-bar.component';
import { BasicSearchComponent } from './search/basic-search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    BeerComponent,
    BeersComponent,
    BeerDetailsComponent,
    BeerFavouritesComponent,
    AdvancedSearchComponent,
    SearchBarComponent,
    BasicSearchComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxWebstorageModule.forRoot(),
    InfiniteScrollModule,
    AppRoutingModule
  ],
  entryComponents: [
    BeerDetailsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
