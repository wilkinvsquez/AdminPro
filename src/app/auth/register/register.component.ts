import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted: boolean = false;

  public registerForm = this.fb.group(
    {
      name: ['Wilkin', [Validators.required, Validators.minLength(3)]],
      email: [
        'wilkinvsquez@gmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['123123', [Validators.required, Validators.minLength(6)]],
      cPassword: ['123123', [Validators.required, Validators.minLength(6)]],
      terms: [true, Validators.required],
    },
    {
      validator: this.passwordsMatch('password', 'cPassword'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {}

  createUser() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this._userService.createUser(this.registerForm.value).subscribe({
      next: (res) => {
        Swal.fire('Great', 'You have been registered', 'success');
        this._router.navigateByUrl('/');
      },
      error: (err) => {
        Swal.fire('There was a problem', err.error.msg, 'error');
      },
    });
  }

  notValidField(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  acceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  notValidPasswords() {
    const pass = this.registerForm.get('password')?.value;
    const cpass = this.registerForm.get('cPassword')?.value;

    if (pass !== cpass && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsMatch(pass: string, cPass: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.get(pass);
      const cPassControl = formGroup.get(cPass);
      if (passControl?.value === cPassControl?.value) {
        cPassControl?.setErrors(null);
      } else {
        cPassControl?.setErrors({ noMatch: true });
      }
    };
  }
}
