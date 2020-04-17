import { AsyncValidator, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({ providedIn: "root" })
export class EmailRegistered implements AsyncValidator {
   constructor(private userService: UserService) { }

   validate = (control: FormControl) => {
      const { value } = control;
      return this.userService.emailRegistered(value);
   }
}
