import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SeleccionarPersonasPage } from '../seleccionar-personas/seleccionar-personas';

@Component({
  selector: 'page-traslado',
  templateUrl: 'traslado.html',
})
export class TrasladoPage {

  lugares: any[];
  supervisores: any[];
  origen: string;
  destino: string;
  supOri: string;
  supDes: string;
  fechaTraslado: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrasladoPage');
    this.lugares = [
      {id: '1', descripcion: 'San Luis'},
      {id: '2', descripcion: 'Rosario'},
      {id: '3', descripcion: 'Cordoba'},
      {id: '4', descripcion: 'Chaco'},
    ];

    this.supervisores =[
      {id: '1', nombre: 'Nicolas Weisheim' },
      {id: '2', nombre: 'Carlos Carlanga' },
      {id: '3', nombre: 'Pepe Pepon' },
      {id: '4', nombre: 'Oscar Tabarez' }
    ]
  }

  seleccionarPersonas(){
    this.navCtrl.push(SeleccionarPersonasPage);
  }

}
