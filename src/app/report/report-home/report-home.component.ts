import { Component, OnInit } from '@angular/core';
import { AccessibilityService } from 'src/app/accessibility.service';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrls: ['./report-home.component.css']
})
export class ReportHomeComponent implements OnInit {

  response$ = new BehaviorSubject({});
  constructor(private accessibilityService: AccessibilityService, private userService: UserService, private router: Router) {
    this.response$ = this.accessibilityService.response$;
  }

  ngOnInit(): void {}

  showreport(urlid: number) {
    this.router.navigate(['/report/details'], { queryParams: { id: urlid } });
  }

}
