import { Ng2DeviceService } from 'ng2-device-detector';
import { CompatibilityService } from './series/services/compatibility.service';
import { InstallService } from './series/services/install.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {


  ocultar : boolean;

  isInstallable: boolean;
  installed = false;
  browser_name: string;
  os: string;
  notifications: boolean;
  instructions: string;
  constructor(private compatibility: CompatibilityService, private install: InstallService) {
    this.isInstallable = compatibility.getIsInstallable();
    if (this.isInstallable) {
      this.installed = install.getIsInstalled();
      if (!this.installed) {
        this.browser_name = compatibility.getBrowserName();
        this.os = compatibility.getOS();
        this.instructions = this.os + '-' + this.browser_name;
      }
    }
    this.notifications = compatibility.getNotificationsSupport();
  }

  understood() {
    this.installed = this.install.understood();
    this.instructions = 'none';
  }




}
