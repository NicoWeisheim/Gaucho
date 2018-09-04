import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListCuadrillasPage } from '../list-cuadrillas/list-cuadrillas';


@Component({
  selector: 'page-seleccionar-personas',
  templateUrl: 'seleccionar-personas.html',
})
export class SeleccionarPersonasPage {

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
      {nombre: 'Juan Carlos Peron', puesto: 'Cocinero', id: '2'}, 
      {nombre: 'Elsa Queo', puesto: 'Maestranza', id: '2'},
      {nombre: 'Aldo Bobadilla', puesto: 'Peon', id: '2'},
      {nombre: 'Oscar Feber', puesto: 'Capataz', id: '2'},
      {nombre: 'Ela Bortito', puesto: 'Peon', id: '2'},
      {nombre: 'Keo Nda', puesto: 'Capataz', id: '2'}
    ]
    this.cuadrillas = [
      {sup: 'Jorge Rito',id: '1', integrantes: [{nombre: 'Juan Carlos Peron', puesto: 'Cocinero', selected: false, id: '1'}, 
      {nombre: 'Elsa Queo', puesto: 'Maestranza', selected: false, id: '1'},
      {nombre: 'Aldo Bobadilla', puesto: 'Capataz', selected: false, id: '1'}],cantPersonas: '3' ,destino: 'Tucuman'},
      {sup: 'Juan Perez', id: '1',integrantes: [{nombre: 'Oscar Feber', puesto: 'Capataz', selected: false, id: '1'},
      {nombre: 'Ela Bortito', puesto: 'Capataz', selected: false, id: '1'},
      {nombre: 'Keo Nda', puesto: 'Capataz', selected: false, id: '1'}], destino: 'Chaco',cantPersonas: '3'},
      {sup: 'Oscar Tabarez',id: '1', integrantes: [{nombre: 'Fernando Gago', puesto: 'Peon', selected: false, id: '1'},
      {nombre: 'Ivan Acer', puesto: 'Maestranza', selected: false, id: '1'},
      {nombre: 'Diosito Borges', puesto: 'Peon', selected: false, id: '1'}], destino: 'San Luis',cantPersonas: '3'},
      {sup: 'Nicolas Weisheim', id: '1',integrantes: [{nombre: 'Pepito perez', puesto: 'Cocinero', selected: false, id: '1'},
      {nombre: 'Kedi Ficil', puesto: 'Cocinero', selected: false, id: '1'},
      {nombre: 'James Rodriguez', puesto: 'Cocinero', selected: false, id: '1'}], destino: 'Misiones',cantPersonas: '3'}

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
