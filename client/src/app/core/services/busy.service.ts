import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) {}

  showSpinner() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      color: '3333333',
      type: 'timer',
      bdColor: 'rgba(0,0,0,0.7)',
      size: 'large',
    });
  }

  hideSpinner() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
