import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class NotificationsService {

  private TOPIC_NODE = 'topics';
  constructor(private http: Http, private db: AngularFireDatabase) { }




  registerTokenInTopic(topic: string, token: string): any {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'key=AAAA5PhW2D4:APA91bHBnLJahMUU8pXNpbQh-S3y-HVW5F2zNsa_BGb0zEodZb9GfZyFP_Nbq8BUm6YPalbsVs_9tMlghcc-4qNnKJi6GioU-OApKOZiN0-9L-A1M5ihSXSjSfLtz0KiMxDs4eRc8msu');
    const url = 'https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/general';
    return this.http.post(url, null, { headers: headers });
  }


  saveTokenInDB(topic: string, token: string): Observable<boolean> {
    const newToken = {};
    newToken[token] = true;
    return Observable.fromPromise(
      this.db.object(this.TOPIC_NODE + '/' + topic).update(newToken).then(ans => {
        console.log(ans);
        return true;
      }).catch(error => {
        console.log(error.message);
        return false;
      })

    );


  }

}
