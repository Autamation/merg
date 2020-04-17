import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  signedin$ = new BehaviorSubject(false);
  constructor(private userService : UserService,private router : Router) {
    this.signedin$ = this.userService.signedin$;
   }

  ngOnInit(): void {

      setTimeout(() => {
        this.signedin$.next(false);
        this.router.navigateByUrl("/login");
      },500)
  }

}
