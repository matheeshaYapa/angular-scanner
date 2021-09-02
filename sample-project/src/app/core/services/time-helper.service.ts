import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeHelperService {

  constructor() { }

  getDate(date: Date = new Date()): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  getToday(): Date {
    return new Date();
  }

  public getPreviousMonthDate(months: number): Date {
    const today = this.getToday();
    return new Date(today.getFullYear(), today.getMonth() - months, today.getDate());
  }

  getStartDateTime(date: Date = new Date()): Date {
    return new Date(date.setHours(0, 0, 0, 1));
  }

  getEndDateTime(date: Date = new Date()): Date {
    return new Date(date.setHours(23, 59, 59, 999));
  }
}
