import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CartsService {

  private MAIN_NODE = 'carts';
  private PAYMENTS_NODE = 'payments';
  constructor(private db: AngularFireDatabase) { }


  createCart(userId: string, cart: Array<any>): Observable<any> {
    const data = {
      'userId': userId,
      'products': cart
    };
    return Observable.fromPromise(
      this.db.database.ref(this.MAIN_NODE).push(data).then(res => {
        return true;
      }).catch(error => {
        console.log(error.message);
        return false;
      })
    );
  }

  getMyCart() {
    return this.db.object(this.MAIN_NODE + '/-KxDeHkxEuxszG1NljMq');
  }


  createPayment(cartId: string, data: any): Observable<any> {
    return Observable.fromPromise(
      this.db.object(this.PAYMENTS_NODE + '/' + cartId).update(data).then(res => {
        return true;
      }).catch(error => {
        console.log(error.message);
        return false;
      })
    );
  }

}
