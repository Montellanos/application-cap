import { CartsService } from './../../series/services/carts.service';
import { ProductsService } from './../../series/services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  products: Array<any> = [];
  private user_id = '1lNXFlkMGnQViyi2fjLetwSyt0F3';

  private cart: Array<any> = [];

  constructor(private proSer: ProductsService, private cartS: CartsService) { }

  ngOnInit() {
    this.proSer.getProducts().subscribe(res => {
      console.log(res);
      this.products = res;
    });
  }




  addToCart(product_key: string) {
    const cantidad = (<HTMLInputElement>document.getElementById(product_key)).value;
    let unit_price = 0;
    this.products.forEach(product => {
      if (product.$key === product_key) {
        unit_price = product.unit_price;
      }
    });
    const subtotal = parseInt(cantidad, 10) * unit_price;
    const data_cart = {
      'cantidad': cantidad,
      'productoKey': product_key,
      'subtotal': subtotal,
      'unit_price' : unit_price
    };
    this.cart.push(data_cart);
    console.log(this.cart);
  }


  saveCart(): void {
    this.cartS.createCart(this.user_id, this.cart).subscribe(res => {
      console.log(res);
    });
  }

}
