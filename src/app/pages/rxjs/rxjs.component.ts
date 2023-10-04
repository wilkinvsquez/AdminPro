import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs: Subscription = new Subscription();

  constructor() {
    // this.observableReturn()
    //   .pipe(retry(1))
    //   .subscribe(
    //     (value) => console.log('Subs: ', value),
    //     (err) => console.warn('Error: ', err),
    //     () => console.info('Obs Done')
    //   );

    // this.returnInterval().subscribe((value) => console.log(value));

    this.intervalSubs = this.returnInterval().subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnInterval() {
    return interval(500).pipe(
      take(10),
      map((value) => value + 1),
      filter((value) => (value % 2 === 0 ? true : false))
    );
  }

  observableReturn(): Observable<number> {
    let i: number = -1;
    return new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 2) {
          clearInterval(interval);
          observer.error('i llego a 2');
        }
      }, 1000);
    });
  }
}
