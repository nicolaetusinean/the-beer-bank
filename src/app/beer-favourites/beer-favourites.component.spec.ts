import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BeerFavouritesComponent} from './beer-favourites.component';

describe('BeerFavouritesComponent', () => {
  let component: BeerFavouritesComponent;
  let fixture: ComponentFixture<BeerFavouritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BeerFavouritesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
