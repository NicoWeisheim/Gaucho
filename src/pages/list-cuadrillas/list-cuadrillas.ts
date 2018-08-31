import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListCuadrillasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-cuadrillas',
  templateUrl: 'list-cuadrillas.html',
})
export class ListCuadrillasPage {

  cuadrillas: any[];
  integrantes: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListCuadrillasPage');
    this.cuadrillas = [
      {sup: 'Jorge Rito', integrantes: [{nombre: 'Juan Carlos Peron', puesto: 'Cocinero'}, 
      {nombre: 'Elsa Queo', puesto: 'Maestranza'},
      {nombre: 'Aldo Bobadilla', puesto: 'Capataz'}], destino: 'Tucuman'},
      {sup: 'Juan Perez', integrantes: [{nombre: 'Oscar Feber', puesto: 'Capataz'},
      {nombre: 'Ela Bortito', puesto: 'Capataz'},
      {nombre: 'Keo Nda', puesto: 'Capataz'}], destino: 'Chaco'},
      {sup: 'Oscar Tabarez', integrantes: [{nombre: 'Fernando Gago', puesto: 'Peon'},
      {nombre: 'Ivan Acer', puesto: 'Maestranza'},
      {nombre: 'Diosito Borges', puesto: 'Peon'}], destino: 'San Luis'},
      {sup: 'Nicolas Weisheim', integrantes: [{nombre: 'Pepito perez', puesto: 'Cocinero'},
      {nombre: 'Kedi Ficil', puesto: 'Cocinero'},
      {nombre: 'James Rodriguez', puesto: 'Cocinero'}], destino: 'Misiones'}

    ]
  }

}
