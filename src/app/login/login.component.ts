import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl
} from "@angular/forms";
import { UserService } from "../user.service";
import { BehaviorSubject, empty } from "rxjs";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loggedin$: BehaviorSubject<boolean>;
  redirectPath = "";
  error: any;
  loadingStatus = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.loggedin$ = this.userService.signedin$;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: ParamMap) => {
      this.redirectPath = params["redirect"];
    });
  }

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  isError(control: AbstractControl) {
    return control.invalid && (control.touched || control.dirty);
  }

  dologin() {
    this.error = "";
    this.loadingStatus = true;
    this.userService.login(this.loginForm.value).subscribe({
      next: response => {
        if (response != null) {
          this.loggedin$.next(true);
          if (this.redirectPath !== undefined && this.redirectPath !== "") {
            this.router.navigateByUrl(this.redirectPath);
          } else {
            this.router.navigateByUrl("/");
          }
        } else {
          this.loggedin$.next(false);
          this.error = { invalidCredential: true };
        }
        this.loadingStatus = false;
      },
      error: err => {
        if (!err.status) {
          this.error = { networkStatus: "Disconnected" };
        } else if (err.status === 500) {
          this.error = { errorCode500: true };
        } else {
          this.error = { unknownError: true };
        }
        this.loadingStatus = false;
      }
    });
  }
}
