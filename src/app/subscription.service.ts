import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  rootUrl = "http://119.82.97.217:9091/equalitylabs";
  //rootUrl = "http://localhost:8080/equalitylabs";
  signedin$ = new BehaviorSubject(false);
  loggedinUser$ = new BehaviorSubject({});
  request = {};

  constructor(
    private httpClient: HttpClient, 
    private router: Router,
    private userService : UserService
    ) {
      this.loggedinUser$ = this.userService.loggedinUser$;
      this.signedin$ = this.userService.signedin$;
     }

  changePlan(plan : string,planCode : string){

    this.request['userType'] = plan;
    this.request['userTypeCode'] = planCode;
    this.request['email'] = this.loggedinUser$.value['email'];
    return this.httpClient.post(this.rootUrl + "/changePlan",this.request)
  }

}
