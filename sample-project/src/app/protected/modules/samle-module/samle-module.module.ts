import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SamleModuleRoutingModule } from './samle-module-routing.module';
import { SamplePageComponent } from './pages/sample-page/sample-page.component';


@NgModule({
  declarations: [
    SamplePageComponent
  ],
  imports: [
    CommonModule,
    SamleModuleRoutingModule
  ]
})
export class SamleModuleModule { }
