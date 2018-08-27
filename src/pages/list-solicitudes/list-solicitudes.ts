import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListSolicitudesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-solicitudes',
  templateUrl: 'list-solicitudes.html',
})
export class ListSolicitudesPage {

  solicitudes: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListSolicitudesPage');
    this.solicitudes = [
      {fechaPed: '20/01/2018', sup: 'Tomas Fanta', cantPer: '10', destino: 'San Luis', diaIngreso: '20/02/2018', open: false},
      {fechaPed: '20/02/2018', sup: 'Juan Perez', cantPer: '11', destino: 'Mendoza', diaIngreso: '20/03/2018', open: false},
      {fechaPed: '20/03/2018', sup: 'Nicolas Weisheim', cantPer: '15', destino: 'Cordoba', diaIngreso: '20/04/2018', open: false},
      {fechaPed: '20/04/2018', sup: 'Oscar Tabarez', cantPer: '22', destino: 'Salta', diaIngreso: '20/05/2018', open: false},
      {fechaPed: '20/05/2018', sup: 'Pepe Pepon', cantPer: '5', destino: 'La Pampa', diaIngreso: '20/06/2018', open: false},
    ];
    console.log(this.solicitudes);
  }

  toggleSection(i) {
    
    this.solicitudes[i].open = !this.solicitudes[i].open ? true : false;
  }

}
