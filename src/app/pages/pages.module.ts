import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [HomeComponent, DashboardComponent]
})
export class PagesModule { }
