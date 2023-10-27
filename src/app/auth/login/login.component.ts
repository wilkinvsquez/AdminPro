import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn: ElementRef;
  public formSubmitted: boolean = false;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private _userService: UserService
  ) {}

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '822008770507-jkbn3338vriide3qp269vrc33uihhl5a.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    this._userService.signInGoogle(response.credential).subscribe({
      next: (res) => {
        this._router.navigateByUrl('/');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [true],
  });

  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this._userService.signIn(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value!);
        }
        this._router.navigateByUrl('/');
      },
      error: (err) => console.log(err),
    });
  }
}
