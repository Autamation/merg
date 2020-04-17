import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AccessibilityService } from 'src/app/accessibility.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public pieChartLabels = ['Failed Test', 'Passed Test'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';
  urlid = -1;
  response$ = new BehaviorSubject({});
  summaryData = {};
  constructor(
    private accessibilityService: AccessibilityService, 
    private userService: UserService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) {
    this.response$ = this.accessibilityService.response$;
    this.pieChartData = [];
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: ParamMap) => {
      this.urlid = params['id'];
      this.summaryData = this.response$.value['testDetails'][this.urlid];
      this.pieChartData = [this.summaryData['failedTests'], this.summaryData['passedTests']];
    })
  }

}
