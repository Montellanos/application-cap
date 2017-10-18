import { NotificationsService } from '../../series/services/notifications.service';
import { CompatibilityService } from './../../series/services/compatibility.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private messaging = firebase.messaging();

  permiss = false;
  token: string;
  constructor(private http: Http, private device: CompatibilityService, private notService: NotificationsService) {
    this.messaging.getToken().then(res => {
      if (res !== null) {
        this.permiss = true;
        this.token = res;
      }
    });

  }



  ngOnInit() {

  }


  requestPermiss(): void {
    this.messaging.requestPermission()
      .then(() => {
        this.permiss = true;
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token);
        this.token = token;
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  subscribeToken(topic: string): void {
    this.notService.registerTokenInTopic(topic, this.token).subscribe(res => {
      if (res.statusText === 'OK') {
        this.notService.saveTokenInDB(topic, this.token).subscribe(ans => {
          console.log(ans);
        });
      }
    });
  }










}
