import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {prizeData} from './prize-fixture';
import { PrizeService } from './prize.service';
import { IPrize } from '../model/prize-data';

describe('PrizeService', () => {
  let service: PrizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable of prizes data', () => {
    let result: IPrize;
    service.loadPrize().subscribe((prize: IPrize) => {
      result = prize;
    });

    expect(result).toBeTruthy();
      expect(result).toEqual(prizeData);
      expect(result.claimTime).toEqual(25);
  });

  it('should return an Observable of counter', fakeAsync(() => {
      const time = 5;
      let counter = 0

      const subscription = service.startCounter(time)
        .subscribe((value: number) => {
          counter = value;
        });

      tick(2000);
      expect(counter).toEqual(4);

      tick(5000);
      expect(counter).toEqual(1);

      subscription.unsubscribe();
  }));
});
