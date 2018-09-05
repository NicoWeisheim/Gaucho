import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-confirmar-traslado',
  templateUrl: 'confirmar-traslado.html',
})
export class ConfirmarTrasladoPage {

  parame: any[];
  cabecillas: any[] = [{}];
  noAsign: any[] = [{}];
  param: any[]  = [{}];
  dato: any[] = [{}];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parame = this.navParams.data;
    this.param = this.parame[0];
    this.dato = this.parame[1];
  }

  ionViewDidLoad() {
    let i = 0;
    let j = 0;
    this.param.forEach(element => {
      if(element.id === '1'){
        this.cabecillas[i] = element;
        i++;
      } else if(element.id === '2'){
        this.noAsign[j] = element;
        j++;
      }
      
    });
    console.log(this.cabecillas);
    console.log(this.noAsign);
    console.log(this.dato);

  }

}
