import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportHomeComponent } from './report-home/report-home.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [ReportHomeComponent, ReportDetailsComponent, ChartComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    ChartsModule
  ]
})
export class ReportModule { }
