import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '../../../node_modules/@ionic-native/qr-scanner';


@Component({
  selector: 'page-escaner',
  templateUrl: 'escaner.html',
})
export class EscanerPage {

  manual: boolean = false;
  qr: string = '';
  hora: string;
  exist: boolean = false;
  camera: boolean = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private qrS: QRScanner, 
    private toast: ToastController) {
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
    this.qrS.show();
    this.showCamera();
     if (status.authorized){
      let scanSub = this.qrS.scan().subscribe((text: string) => {
          this.qr = text;         
          console.log(this.qr);  
          this.qrS.hide();         
          this.hideCamera();          
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

  showCamera() {    
    this.camera = !this.camera ? true : false;
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
    
  }

  hideCamera() { 
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    this.exist = this.exist ? false : true;     
    this.hora = new Date().toLocaleTimeString(); 
    
  }

}
