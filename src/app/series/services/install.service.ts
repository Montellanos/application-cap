import { Injectable } from '@angular/core';

@Injectable()
export class InstallService {

  private installed = false;
  private installed_control = localStorage.getItem('installed');
  constructor() {
    if (this.installed_control !== null || this.installed_control !== undefined) {
      if (this.installed_control === 'true') {
        this.installed = true;
      }
    }
  }

  getIsInstalled(): boolean {
    return this.installed;
  }

  understood(): boolean {
    localStorage.setItem('installed', 'true');
    this.installed = true;
    return this.getIsInstalled();
  }

}
