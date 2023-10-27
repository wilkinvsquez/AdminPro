import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  constructor(private _router: Router, private _userService: UserService) {}

  logout() {
    this._userService.logout();
    this._router.navigateByUrl('/login');
  }
}
