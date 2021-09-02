import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';
import {environment} from '../../../environments/environment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return super.transform(value, environment.customDateFormats.dateFormat);
  }

}
