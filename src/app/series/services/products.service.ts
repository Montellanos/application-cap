import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductsService {

  private MAIN_NODE = 'products';

  constructor(private db: AngularFireDatabase) { }


  getProducts(): any {
    return this.db.list(this.MAIN_NODE);
  }

}
