import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {timer} from 'rxjs';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  remainingSeconds: number;
  waitTime = 5; // in seconds

  constructor(private router: Router) { }

  ngOnInit() {
    this.redirectToHomepage();
  }

  redirectToHomepage() {
    const timerSubscription = timer(0, 1000).subscribe(t => {
      this.remainingSeconds = this.waitTime - t;

      if (this.waitTime === t) {
        timerSubscription.unsubscribe();
        this.router.navigate(['/']);
      }
    });

  }
}
