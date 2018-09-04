import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConfirmarTrasladoPage } from '../confirmar-traslado/confirmar-traslado';

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
  supervisor: any[];
  list: any[];
  noAsignados: any[];
  filter: boolean = true;
  finalList: any[] = [{}];
  superv: {};
  personasFilter: string = 'cuadrilla';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.supervisor = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListCuadrillasPage');

    this.noAsignados = [
      {nombre: 'Juan Carlos Peron', puesto: 'Cocinero', selected: false, id: '2'}, 
      {nombre: 'Elsa Queo', puesto: 'Maestranza', selected: false, id: '2'},
      {nombre: 'Aldo Bobadilla', puesto: 'Peon', selected: false, id: '2'},
      {nombre: 'Oscar Feber', puesto: 'Capataz', selected: false, id: '2'},
      {nombre: 'Ela Bortito', puesto: 'Peon', selected: false, id: '2'},
      {nombre: 'Keo Nda', puesto: 'Capataz', selected: false, id: '2'}
    ]

    this.list = this.supervisor;
    this.superv = {
      nombre: this.supervisor.sup,
      id: this.supervisor.id
    }
    this.finalList.push(this.superv);
    console.log(this.finalList);
  }

  filterPersonas(){
    if(this.personasFilter === 'cuadrilla'){
      this.list = this.supervisor;
      this.filter = true;
    } else {
      this.list = this.noAsignados;
      this.filter = false;
    };
  }

  itemTapped($event, item){
    if(this.finalList.indexOf(item) === -1){
      this.finalList.push(item);
      item.selected = true;
    } 
    else {
        this.finalList.splice(this.finalList.indexOf(item), 1);
        item.selected = false;
    }
    
    console.log(this.finalList);
  }

  confirmarTraslado(){
    this.navCtrl.push(ConfirmarTrasladoPage, this.finalList);
  }

}
