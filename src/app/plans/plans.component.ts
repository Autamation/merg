import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from "src/app/user.service";
import { SubscriptionService } from '../subscription.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  signedin$ = new BehaviorSubject(false);
  loggedinUser$ = new BehaviorSubject({});

  constructor(
    private userService: UserService,
    private subscriptionService : SubscriptionService
  ) { 
    this.loggedinUser$ = this.userService.loggedinUser$;
    this.signedin$ = this.userService.signedin$;
  }

  ngOnInit(): void {
  }

}
