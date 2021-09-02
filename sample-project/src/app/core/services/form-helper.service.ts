import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  constructor() { }

  // Confirm Password Validation
  isSamePassword(control: FormControl, form: FormGroup) {
    let password = '';
    if (form) {
      if (form.value.password !== null ) {
        password = form.value.password;
      }
    }
    if (control.value !== password && control.value !== null && control.value !== '') {
      return {isSamePassword: true};
    }
    return null;
  }
}
