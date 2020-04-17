import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user.service';
import { SubscriptionService } from '../subscription.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plan-confirm',
  templateUrl: './plan-confirm.component.html',
  styleUrls: ['./plan-confirm.component.css']
})
export class PlanConfirmComponent implements OnInit {
  loadingStatus = false;
  error : any;
  signedin$ = new BehaviorSubject(false);
  loggedinUser$ = new BehaviorSubject({});
  typeCode = 'f';
  type = 'Free Account';
  request = {};

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private subscriptionService : SubscriptionService,
    private route:ActivatedRoute,
    private router:Router
  ) { 
    this.loggedinUser$ = this.userService.loggedinUser$;
    this.signedin$ = this.userService.signedin$;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.typeCode =params['type'];
      if(this.typeCode === 'i'){
        this.type = 'Individual Account';
      }else if(this.typeCode === 'b'){
        this.type = 'Business Account';
      }else {
        this.typeCode = 'f'
        this.type = 'Free Account';
      }

      this.planConfirmForm.controls['name'].setValue(this.loggedinUser$.value['name']);
      this.planConfirmForm.controls['email'].setValue(this.loggedinUser$.value['email']);
      this.planConfirmForm.controls['newPlan'].setValue(this.type);
      this.planConfirmForm.controls['currentPlan'].setValue(this.loggedinUser$.value['userType']);
    })
  }

  planConfirmForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    currentPlan: ['', [Validators.required]],
    newPlan: ['', [Validators.required]],
  });

  changePlan(){
    this.loadingStatus = true;
    this.subscriptionService.changePlan(this.type,this.typeCode).subscribe({
      next : (response => {
        this.loggedinUser$.next(response);
        this.router.navigateByUrl('/profile');
        this.loadingStatus = false;
      }),
      error : (err => {
        if (!err.status) {
          this.error = { networkStatus: 'Disconnected' };
        } else if (err.status === 500) {
          this.error = { errorCode500: true };
        } else {
          this.error = { unknownError: true };
        }
        this.loadingStatus = false;
      })
    }
    );
  }

}
