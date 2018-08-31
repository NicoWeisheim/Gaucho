import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '../../../node_modules/@ionic-native/qr-scanner';


@Component({
  selector: 'page-escaner',
  templateUrl: 'escaner.html',
})
export class EscanerPage {

  manual: boolean = false;
  qr: string;
  hora: string;
  exist: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private qrS: QRScanner, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscanerPage');
    
  }

  ingresarManualmente(){
    this.manual = this.manual ? false : true;
  }

  openScanner(){
   this.qrS.prepare()
   .then((status: QRScannerStatus) => {
     if (status.authorized){
      let scanSub = this.qrS.scan().subscribe((text: string) => {
         this.qr = text;
         this.qrS.hide();
         scanSub.unsubscribe();
       });
     } else {
      let toast = this.toast.create({
        message: 'Es necesario dar permisos para el escaner',
        duration: 2000,
        position: 'middle'
      });
      toast.present();
     };
   }).catch((e: any) => console.log('error: ', e));
  }

  manualScan(){
    this.hora = new Date().toLocaleTimeString();
    this.exist = !this.exist ? true : false;
  }

}
