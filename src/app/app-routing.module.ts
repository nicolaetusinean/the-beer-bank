import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BeersComponent} from './beers/beers.component';
import {BeerFavouritesComponent} from './beer-favourites/beer-favourites.component';
import {BasicSearchComponent} from './search/basic-search.component';
import {AdvancedSearchComponent} from './search/advanced-search.component';

const routes: Routes = [
  { path: 'beers', component: BeersComponent},
  { path: '', redirectTo: '/beers', pathMatch: 'full' },
  { path: 'favourite-beers', component: BeerFavouritesComponent },
  { path: 'basic-search', component: BasicSearchComponent },
  { path: 'advanced-search', component: AdvancedSearchComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
