import { Component, OnInit, OnDestroy } from '@angular/core';
import {PrizeService} from '../../services/prize.service';
import {filter, takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IPrize } from 'src/app/model/prize-data';

@Component({
  selector: 'app-test-demo',
  templateUrl: './prize.component.html',
  styleUrls: ['./prize.component.sass']
})
export class PrizeComponent implements OnInit, OnDestroy {

  public message = '';
  public countDown = '';
  public claimedMessage = '';
  public isDisabled = false;
  public claimed = false;
  public destroy$ = new Subject<void>();

  constructor(private prizeService: PrizeService) { }

  ngOnInit(): void {
    this.prizeService.loadPrize()
        .pipe(filter(prize => !! prize), takeUntil(this.destroy$))
        .subscribe(prize => {
          this.displayData(prize);
          this.startClock(prize.claimTime);
        });
  }

  displayData(data: IPrize): void {
    this.message = `${data.prizeAmount} ${data.message}`;
    this.claimedMessage = `${this.buildClaimedMessage(data)}`;
    this.countDown = this.formatCountDown(data.claimTime);
  }

  buildClaimedMessage(prize: IPrize): string {
    return prize.claimedMessage.replace('{}', prize.prizeAmount.toString());
  }

  startClock(time: number): void {
    this.prizeService.startCounter(time)
        .pipe(filter(prize => !! prize), takeUntil(this.destroy$))
        .subscribe(d => {
          d--;
          this.countDown = this.formatCountDown(d);
          if (d === 0) {
            this.isDisabled = true;
          }
        });
  }

  fixFormat(d: number): string {
    return d > 9 ? `${d}`: `0${d}`;
  }

  claimNow(): void {
    this.message = this.claimedMessage;
    this.claimed = true;
    this.stopClock();
  }

  formatCountDown(time: number): string {
    const m = Math.floor(time % 3600 / 60);
    const s = Math.floor(time % 3600 % 60);
    const mDisplay = m > 0 ? this.fixFormat(m) : '00';
    const sDisplay = s > 0 ? this.fixFormat(s) : '00';
    return `${mDisplay}:${sDisplay}`;
 }

 stopClock(): void {
  this.destroy$.next();
  this.destroy$.complete();
 }

  ngOnDestroy(): void {
    this.stopClock();
  }
}
