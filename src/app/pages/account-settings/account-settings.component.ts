import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  public linkTheme = document.querySelector('#theme');
  public links: NodeListOf<Element> | undefined;

  constructor(private _settingService: SettingsService) { }

  ngOnInit(): void {
    this._settingService.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    this._settingService.changeTheme(theme);
  }
}
