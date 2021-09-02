import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SampleModuleRoutingModule } from './sample-module-routing.module';
import { SamplePageComponent } from './pages/sample-page/sample-page.component';
import {SharedModule} from "../../../core/shared/shared.module";
import {GlobalLabelModule} from "../../../global/global-label/global-label.module";


@NgModule({
  declarations: [
    SamplePageComponent
  ],
  imports: [
    CommonModule,
    SampleModuleRoutingModule,
    SharedModule,
    GlobalLabelModule
  ]
})
export class SampleModuleModule { }
