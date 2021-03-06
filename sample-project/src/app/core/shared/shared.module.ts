import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import {MAT_DATE_FORMATS} from '@angular/material/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { DateTimeFormatPipe } from '../pipes/date-time-format.pipe';
import {RouterModule} from "@angular/router";

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MMM/YYYY',
  },
  display: {
    dateInput: 'DD/MMM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    DateTimeFormatPipe,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    DateFormatPipe,
    DateTimeFormatPipe,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
  ],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],

})
export class SharedModule {}
