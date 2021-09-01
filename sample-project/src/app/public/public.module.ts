import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import {LoginComponent} from "./pages/login/login.component";
import { LayoutComponent } from './pages/layout/layout.component';
import {SharedModule} from "../core/shared/shared.module";


@NgModule({
  declarations: [
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
