import { Injectable } from '@angular/core';

import { Ng2DeviceService } from 'ng2-device-detector';

@Injectable()
export class CompatibilityService {

  private device: any;
  private notifications = false;
  private installable = false;
  private browser_name: string;
  private os: string;
  constructor(private deviceService: Ng2DeviceService) {
    this.device = this.deviceService.getDeviceInfo();
    this.browser_name = this.device.browser;
    this.os = this.device.os;
  }

  getBrowserName() {
    return this.browser_name;
  }

  getOS() {
    if (this.os === 'mac' || this.os === 'ios') {
      return 'ios';
    } else {
      return this.os;
    }
  }

  getNotificationsSupport(): boolean {
    if (this.browser_name === 'chrome' || this.browser_name === 'firefox') {
      if (this.os === 'android' || this.os === 'windows' || this.os === 'linux') {
        this.notifications = true;
      }
    }
    return this.notifications;
  }

  getIsInstallable(): boolean {
    if (this.os === 'android' && this.browser_name === 'chrome') {
      this.installable = true;
    } else {
      if ((this.os === 'ios' || this.os === 'mac') && this.browser_name === 'safari') {
        this.installable = true;
      }
    }
    return this.installable;
  }

}
