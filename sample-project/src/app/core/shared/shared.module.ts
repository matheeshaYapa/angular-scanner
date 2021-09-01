import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SlideshowModule } from 'ng-simple-slideshow';
import { MaterialModule } from './material.module';



import {NgImageSliderModule} from 'ng-image-slider';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {DateAdapter as MDateAdapter} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarComponent } from '@global/first-phase-global-components/common-components/calendar/calendar.component';


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
    CalendarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgSelectModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgImageSliderModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    // FontAwesomeModule,
    SlideshowModule,
    CalendarComponent,
    NgSelectModule,
  ],
  providers: [
    {
      provide: MDateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],

})
export class SharedModule {
}
