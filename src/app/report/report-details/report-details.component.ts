import { Component, OnInit } from '@angular/core';
import { AccessibilityService } from 'src/app/accessibility.service';
import { UserService } from 'src/app/user.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent implements OnInit {

  response$ = new BehaviorSubject({});
  singedin$ = new BehaviorSubject(false);
  constructor(
    private accessibilityService: AccessibilityService, 
    private userService: UserService, 
    private router: Router,
    private location:Location) {
    this.response$ = this.accessibilityService.response$;
  }

  ngOnInit(): void {}

  goback(){
    this.location.back();
  }

}
