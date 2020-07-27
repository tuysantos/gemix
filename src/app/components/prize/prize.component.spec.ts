import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PrizeComponent } from './prize.component';
import {PrizeService} from '../../services/prize.service';
import { Observable, of } from 'rxjs';
import {prizeData} from '../../services/prize-fixture';
import {IPrize} from '../../model/prize-data';
import {By} from '@angular/platform-browser';

describe('PrizeComponent', () => {
  let component: PrizeComponent;
  let fixture: ComponentFixture<PrizeComponent>;
  let scenario = 1;

  class prizeServiceMock {
    loadPrize(): Observable<IPrize> {
      return of(prizeData);
    }

    startCounter(duration: number): Observable<number> {
      return scenario === 1 ? of(14) : of(1);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeComponent ],
      providers: [{ provide: PrizeService, useClass: prizeServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return prize data', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.message).toEqual('50 Free Spins on Gemix');
    expect(component.claimedMessage).toEqual('You\'ve 50 Free Spins to use now');
  });

  it('should fixFormat to 2 digits', () => {
    const result = component.fixFormat(2);
    expect(result).toEqual('02');
  })

  it('should fixFormat', () => {
    const result = component.fixFormat(11);
    expect(result).toEqual('11');
  });

  it('should buildClaimedMessage', () => {
    const result = component.buildClaimedMessage(prizeData);
    expect(result).toEqual('You\'ve 50 Free Spins to use now');
  });

  it('should formatCountDown', () => {
    const result = component.formatCountDown(150);
    expect(result).toEqual('02:30');
  });

  it('should call ngOnDestroy', () => {
    spyOn(component, 'stopClock');
    component.ngOnDestroy();
    expect(component.stopClock).toHaveBeenCalled();
  });

  it('should call destroy$.complete', () => {
    spyOn(component.destroy$, 'complete');
    component.ngOnDestroy();
    expect(component.destroy$.complete).toHaveBeenCalled();
  });

  describe('claiming prize', () => {

    it('shuld display the data', () => {
      component.displayData(prizeData);
      expect(component.message).toEqual('50 Free Spins on Gemix');
      expect(component.claimedMessage).toEqual('You\'ve 50 Free Spins to use now');
      expect(component.countDown).toEqual('00:25');
    });

    it('should claime prize', fakeAsync(() => {
      const time = 5;
      component.startClock(time);
      tick(2000);
      component.claimNow();
      fixture.detectChanges();
      expect(component.message).toEqual('You\'ve 50 Free Spins to use now');
      expect(component.claimed).toBe(true);
    }));
  });

  describe('not claiming prizing (disabled)', () => {
    scenario = 2;
    it('should disabled button', () => {
      const button = fixture.debugElement.query(By.css('button'));
      component.ngOnInit();
      expect(button.nativeElement.disabled).toBe(true);
    });
  });
});
