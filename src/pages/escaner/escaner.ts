import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '../../../node_modules/@ionic-native/qr-scanner';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';
import { EscanerLogPage } from '../escaner-log/escaner-log';

interface proyectos{
  id: number;
  nombre: string,
  campo_id:number
}

@Component({
  selector: 'page-escaner',
  templateUrl: 'escaner.html',
})
export class EscanerPage {

  manual: boolean = false;
  qr: string = '';
  camera: boolean = true;
   proyectos: proyectos[] = [{
    id: 0,
    nombre: '',
    campo_id:0
  }]
  data: {
    qr: string,
    proyecto: string
  } = {
    qr: '',
    proyecto: ''
  }

  proyecto: string = '';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private qrS: QRScanner,  
    private sql: SqlStorageProvider,
    private alertCtrl: AlertController) {

      this.sql.getProyectos().then((data: proyectos[]) => this.proyectos = data);
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
          this.qrS.hide();         
          this.hideCamera();          
          scanSub.unsubscribe();
          console.log(this.qr);
          this.data.qr = this.qr;
          this.data.proyecto = this.proyecto;
          if(this.proyecto === '' || this.qr === ''){
            this.presentAlert('Error', 'Hay uno o mas campos vacios');
          } else {
            this.navCtrl.push(EscanerLogPage, this.data);
          }
       });
     } 
   }).catch((e: any) => console.log('error: ', e));
  }


  manualScan(){ 
      this.data.qr = this.qr;
      this.data.proyecto = this.proyecto;
      if(this.proyecto === '' || this.qr === ''){
        this.presentAlert('Error', 'Hay uno o mas campos vacios');
      } else {
        this.navCtrl.push(EscanerLogPage, this.data);
      }
  }

  presentAlert(title, subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Ok']
    });
    alert.present();
  }


  showCamera() {    
    this.camera = this.camera ? false : true;
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
    
  }


  hideCamera() { 
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    
  }

  

}
