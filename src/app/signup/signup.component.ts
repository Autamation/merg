import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { PasswordMatch } from '../password-match';
import { EmailRegistered } from '../email-registered';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error: any;
  loadingStatus = false;
  signupStatus = false;
  redirectTime = 5;
  type = '';
  typeCode = '';
  constructor(
    private fb: FormBuilder,
    private passwordMatch: PasswordMatch,
    private emailRegistered: EmailRegistered,
    private userService: UserService,
    private router: Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.signupStatus = false;
    this.redirectTime = 5;
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
      this.signupForm.controls['userType'].setValue(this.type);
      this.signupForm.controls['userTypeCode'].setValue(this.typeCode);
    })
  }

  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email], [this.emailRegistered.validate]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    userType : ['',Validators.required],
    userTypeCode : ['',Validators.required]
  }, {
    validators: [this.passwordMatch.validate]
  });

  isError(control: AbstractControl) {
    return control.invalid && (control.touched || control.dirty);
  }

  get email() {
    return this.signupForm.get('email');
  }

  get name() {
    return this.signupForm.get('name');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get passwordConfirm() {
    return this.signupForm.get('passwordConfirm');
  }

  registerUser() {
    this.loadingStatus = true;
    this.userService.registerUser(this.signupForm.value).subscribe({
      next: (response => {
        this.signupStatus = true;
        const loginRedirect = setInterval(() => {
          this.redirectTime = this.redirectTime - 1;
          if (this.redirectTime === 0) {
            clearInterval(loginRedirect);
            this.router.navigateByUrl('/login');
            this.loadingStatus = false;
          }
        }, 1000);
      }),
      error: (err => {
        if (!err.status) {
          this.error = { networkStatus: 'Disconnected' };
        } else if (err.status === 500) {
          this.error = { errorCode500: true };
        } else {
          this.error = { unknownError: true };
        }
        this.loadingStatus = false;
      })
    });
  }
}
