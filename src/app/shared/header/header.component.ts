import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public user: User;
  constructor(private _router: Router, private _userService: UserService) {
    this.user = _userService.user;
  }

  logout() {
    this._userService.logout();
    this._router.navigateByUrl('/login');
  }
}
