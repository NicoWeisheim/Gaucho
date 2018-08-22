import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-escaner',
  templateUrl: 'escaner.html',
})
export class EscanerPage {

  manual: boolean = false;
  qr: string;
  hora: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscanerPage');
    this.hora = new Date().toLocaleTimeString();
  }

  ingresarManualmente(){
    this.manual = this.manual ? false : true;
  }

  openScanner(){
    this.barcodeScanner.scan().then(data => {
      this.qr = data.text;
    }).catch(err => {
      console.log(err);
    });
  }

}
