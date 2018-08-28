import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TrasladosListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-traslados-list',
  templateUrl: 'traslados-list.html',
})
export class TrasladosListPage {

  traslados: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrasladosListPage');
    this.traslados = [
      {fechaPed: '20/01/2018', supOri: 'Jorge Rito', cantPer: '10', destino: 'San Luis', diaIngreso: '20/02/2018', supDes: 'Usuario'},
      {fechaPed: '20/02/2018', supOri: 'Juan Perez', cantPer: '11', destino: 'Mendoza', diaIngreso: '20/03/2018', supDes: 'Usuario'},
      {fechaPed: '20/03/2018', supOri: 'Nicolas Weisheim', cantPer: '15', destino: 'Cordoba', diaIngreso: '20/04/2018', supDes: 'Usuario'},
      {fechaPed: '20/04/2018', supOri: 'Oscar Tabarez', cantPer: '22', destino: 'Salta', diaIngreso: '20/05/2018', supDes: 'Usuario'},
      {fechaPed: '20/05/2018', supOri: 'Pepe Pepon', cantPer: '5', destino: 'La Pampa', diaIngreso: '20/06/2018', supDes: 'Usuario'}
    ];
  }

}
