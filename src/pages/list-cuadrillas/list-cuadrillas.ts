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
  supervisor: any[];
  list: any[];
  noAsignados: any[];
  filter: boolean = true;
  finalList: any[] = [{}];
  personasFilter: string = 'cuadrilla';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.supervisor = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListCuadrillasPage');

    this.noAsignados = [
      {nombre: 'Juan Carlos Peron', puesto: 'Cocinero', selected: false}, 
      {nombre: 'Elsa Queo', puesto: 'Maestranza', selected: false},
      {nombre: 'Aldo Bobadilla', puesto: 'Peon', selected: false},
      {nombre: 'Oscar Feber', puesto: 'Capataz', selected: false},
      {nombre: 'Ela Bortito', puesto: 'Peon', selected: false},
      {nombre: 'Keo Nda', puesto: 'Capataz', selected: false}
    ]

    this.list = this.supervisor;
    console.log(this.list);
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


}
