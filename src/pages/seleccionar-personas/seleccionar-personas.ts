import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-seleccionar-personas',
  templateUrl: 'seleccionar-personas.html',
})
export class SeleccionarPersonasPage {

  cabecillas: any[];
  noAsignados: any[];
  personasFilter: string = 'cabecillas';
  list: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionarPersonasPage');

    this.noAsignados = [
      {nombre: 'Juan Carlos Peron', puesto: 'Cocinero'}, 
      {nombre: 'Elsa Queo', puesto: 'Maestranza'},
      {nombre: 'Aldo Bobadilla', puesto: 'Peon'},
      {nombre: 'Oscar Feber', puesto: 'Capataz'},
      {nombre: 'Ela Bortito', puesto: 'Peon'},
      {nombre: 'Keo Nda', puesto: 'Capataz'}
    ]

    this.cabecillas = [
      
      {id: '1', nombre: 'Nicolas Weisheim' },
      {id: '2', nombre: 'Carlos Carlanga' },
      {id: '3', nombre: 'Pepe Pepon' },
      {id: '4', nombre: 'Oscar Tabarez' }
      
    ]
  }

  filterPersonas(){
    if(this.personasFilter === 'cabecillas'){
      this.list = this.cabecillas;
    } else {
      this.list = this.noAsignados;
    };
  }

}
