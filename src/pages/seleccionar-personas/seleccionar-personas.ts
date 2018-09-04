import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListCuadrillasPage } from '../list-cuadrillas/list-cuadrillas';


@Component({
  selector: 'page-seleccionar-personas',
  templateUrl: 'seleccionar-personas.html',
})
export class SeleccionarPersonasPage {

  cabecillas: any[];
  noAsignados: any[];
  personasFilter: string = 'cabecillas';
  list: any[];
  cuadrillas: any[];
  filter: boolean = true;
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
    this.cuadrillas = [
      {sup: 'Jorge Rito', integrantes: [{nombre: 'Juan Carlos Peron', puesto: 'Cocinero', selected: false}, 
      {nombre: 'Elsa Queo', puesto: 'Maestranza', selected: false},
      {nombre: 'Aldo Bobadilla', puesto: 'Capataz', selected: false}],cantPersonas: '3' ,destino: 'Tucuman'},
      {sup: 'Juan Perez', integrantes: [{nombre: 'Oscar Feber', puesto: 'Capataz', selected: false},
      {nombre: 'Ela Bortito', puesto: 'Capataz', selected: false},
      {nombre: 'Keo Nda', puesto: 'Capataz, selected: false'}], destino: 'Chaco',cantPersonas: '3'},
      {sup: 'Oscar Tabarez', integrantes: [{nombre: 'Fernando Gago', puesto: 'Peon', selected: false},
      {nombre: 'Ivan Acer', puesto: 'Maestranza', selected: false},
      {nombre: 'Diosito Borges', puesto: 'Peon', selected: false}], destino: 'San Luis',cantPersonas: '3'},
      {sup: 'Nicolas Weisheim', integrantes: [{nombre: 'Pepito perez', puesto: 'Cocinero', selected: false},
      {nombre: 'Kedi Ficil', puesto: 'Cocinero', selected: false},
      {nombre: 'James Rodriguez', puesto: 'Cocinero', selected: false}], destino: 'Misiones',cantPersonas: '3'}

    ]
    

    this.list = this.cuadrillas;
  }

  filterPersonas(){
    if(this.personasFilter === 'cabecillas'){
      this.list = this.cuadrillas;
      this.filter = true;
    } else {
      this.list = this.noAsignados;
      this.filter = false;
    };
  }

  itemTapped($event, cuad){
    this.navCtrl.push(ListCuadrillasPage, cuad);
  }

}
