import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-confirmar-traslado',
  templateUrl: 'confirmar-traslado.html',
})
export class ConfirmarTrasladoPage {

  param: any[];
  cabecillas: any[] = [{}];
  noAsign: any[] = [{}];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.param = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log(this.param);

    this.param.forEach(element => {
      if(element.id === '1'){
        this.cabecillas.push(element)
      } else {
        this.noAsign.push(element);
      }
      
    });
  }

}
