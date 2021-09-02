import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalLabelComponent } from './pages/global-label.component';
import {SharedModule} from "../../core/shared/shared.module";



@NgModule({
  declarations: [
    GlobalLabelComponent
  ],
  exports: [
    GlobalLabelComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class GlobalLabelModule { }
