import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import {IPrize} from '../model/prize-data';
import { prizeData} from './prize-fixture';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {

  constructor() { }

  loadPrize(): Observable<IPrize> {
    return of(prizeData);
  }

  startCounter(duration: number): Observable<number> {
    const timer$ = timer(1000, 1000);
    return timer$.pipe(take(duration), map(() => duration--));
  }

}
