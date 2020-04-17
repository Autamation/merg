import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { PasswordMatch } from '../password-match';
import { UserService } from 'src/app/user.service';
import { BehaviorSubject, pipe } from 'rxjs';
import { Router } from '@angular/router';
import { AccessibilityService } from 'src/app/accessibility.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loggedinUser$ = new BehaviorSubject({});
  error: any;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private accessibilityService: AccessibilityService, private passwordMatch: PasswordMatch) {
    this.loggedinUser$ = this.userService.loggedinUser$;
  }

  ngOnInit(): void {}

  changePwdForm = this.fb.group({
    currentPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
  }, {
    validators: [this.passwordMatch.validate]
  })

  isError(control: AbstractControl) {
    return control.invalid && (control.touched || control.dirty)
  }

  get currentPassword() {
    return this.changePwdForm.get('currentPassword');
  }

  get password() {
    return this.changePwdForm.get('password');
  }

  get passwordConfirm() {
    return this.changePwdForm.get('passwordConfirm');
  }

}
