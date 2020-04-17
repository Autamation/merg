import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportHomeComponent } from './report-home/report-home.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { ChartComponent } from './chart/chart.component';
import { UserService } from '../user.service';


const routes: Routes = [
  {path : '' , component : ReportHomeComponent},
  {path : "dashboard" , component : ReportDetailsComponent , canActivate : [UserService]},
  {path : "details/:id" , component : ChartComponent , canActivate : [UserService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
