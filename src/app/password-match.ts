import { Validator, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PasswordMatch implements Validator {
    validate(formGroup: FormGroup) {
        const { password, passwordConfirm } = formGroup.value;
        if (password === passwordConfirm) {
            return null;
        } else {
            return { passwordDoesNotMatch: true };
        }
    }
}
