import { CartsService } from './../../series/services/carts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {

  my_cart: Array<any> = [];
  constructor(private cartS: CartsService) { }

  ngOnInit() {
    this.cartS.getMyCart().subscribe(res => {
      console.log('llegas');
      let total = 0;
      this.my_cart = res;
      this.my_cart['products'].forEach(elem => {
        total = total + elem.subtotal;
      });
      this.my_cart['total'] = total;
    });
  }


  Pagar(): void {
    const cellphone = (<HTMLInputElement>document.getElementById('cellphone')).value;
    let items = '';
    let correlativo = 1;
    this.my_cart['products'].forEach(elem => {
      items = items + '*i' + correlativo + '|' + elem.cantidad + '|' + elem.productoKey + '|' + elem.unit_price + '|' + elem.subtotal;
      correlativo = correlativo + 1;
    });
    const data = {
      pv_nroDocumento: 5784450,
      pv_orderId: this.my_cart['$key'],
      pv_mensaje: 'se realiza el cobra a periquito por el concepto del pago al servicio',
      pv_monto: this.my_cart['total'],
      pv_linea: cellphone,
      pv_nombre: 'Jorge Montellanos Díaz',
      pv_urlCorrecto: '',
      pv_urlError: '',
      pv_confirmacion: 'CAP TARIJA',
      pv_notificacion: 'CAP TARIJA',
      pv_items: items,
      pv_razonSocial: 'Jorgemontellanos',
      pv_nit: 5784450012
    };

    this.cartS.createPayment(this.my_cart['$key'], data).subscribe(res => {
      console.log(res);
    });



  }

}
