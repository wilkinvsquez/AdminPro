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
  public menuItems: any;

  constructor(
    private _sidebarService: SidebarService,
    private _userService: UserService
  ) {
    this.menuItems = this._sidebarService.menu;
    this.user = this._userService.user;
  }
}
