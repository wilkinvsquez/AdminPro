import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  public user: User;

  constructor(
    public _sidebarService: SidebarService,
    private _userService: UserService
  ) {
    this.user = this._userService.user;
  }
}
