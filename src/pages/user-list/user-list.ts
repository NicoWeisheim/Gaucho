import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {

  users: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserListPage');
    this.users = [
      {nombre: 'Juan Carlos Peron', puesto: 'Cocinero', cuadrilla: ''},
      {nombre: 'Oscar Feber', puesto: 'Capataz', cuadrilla: 'Juan Perez'},
      {nombre: 'Fernando Gago', puesto: 'Peon', cuadrilla: 'Nicolas Weisheim'},
      {nombre: 'Pepito perez', puesto: 'Cocinero', cuadrilla: 'Nicolas Weisheim'}

    ]
  }

}
