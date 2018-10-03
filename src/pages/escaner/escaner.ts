import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController} from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '../../../node_modules/@ionic-native/qr-scanner';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';
import { EscanerLogPage } from '../escaner-log/escaner-log';
import {Http, Jsonp} from '@angular/http'
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
interface proyectos{
  id: number;
  nombre: string,
  campo_id:number
}

interface campos{
  id: number,
  nombre_campo: string,
  numero_planta: number
}
interface trabajadores {
  id: number,
  nombre: string,
  puesto_id: number,
  foto: string,
  qr: number,
  cuadrilla_id: number
}
interface usuarios {
  id: number,
  nombre: string
}

interface cuadrillas {
  id: number,
  nombre_cuadrilla: string
}
@Component({
  selector: 'page-escaner',
  templateUrl: 'escaner.html',
})
export class EscanerPage {

  manual: boolean = false;
  qr: string = '';
  
  data: {
    qr: string,
  } = {
    qr: '',
  }
  camera: boolean = true;

  respTrabajadores: trabajadores[] =[{
    id: 0,
  nombre: '',
  puesto_id: 0,
  foto: '',
  qr: 0,
  cuadrilla_id: 0
  }]

  respSupervisores: usuarios[] = [{
    id: 0,
    nombre: ''
  }];

  respCampos: campos[] = [{
    id: 0,
    nombre_campo: '',
    numero_planta: 0
  }];

  respProyectos: proyectos[] = [{
    id: 0,
    campo_id: 0,
    nombre: ''
  }];
  dato: any;
  respCuadrillas: cuadrillas[] =[{
    id: 0,
    nombre_cuadrilla: ''
  }];
  fecha: string = '';
  flash: boolean;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private qrS: QRScanner,  
    private sql: SqlStorageProvider,
    private http: Http,
    private storage: NativeStorage,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private transfer: FileTransfer, 
    private file: File) {
      this.storage.getItem('login')
      .then(
        data => {
          this.storage.getItem('fecha')
          .then(
            res => {
              let hoy = new Date();
              let fecha = hoy.toISOString().substring(0,10);
          if(res.value != fecha){
            this.syncDescarga(data.token);
          }
          else {console.log(res.value + '' + fecha)}
            },
              error =>{ this.syncDescarga(data.token);}
          )
        },
        error => console.error(error)
      );
     
    this.storage.getItem('flash').then( data => {
      this.flash = data.value;
    });
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Sincronizacion completa',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
}
  syncDescarga(token){
    const fileTransfer: FileTransferObject = this.transfer.create();
    let body = {token: [{value: token}]};
    let loading = this.loadingController.create({
      content: 'Getting data...'
    });
    
    loading.present().then(() => {
    this.http.post('', {body:JSON.parse(JSON.stringify(body))})
    .subscribe(data => {
      let a = data.json();
      console.log(data.json());
      if(a.status === 1){
        this.respTrabajadores = a.trabajadores;
        this.respSupervisores = a.supervisores;
        this.respCampos = a.origen;
        this.respCuadrillas = a.cuadrillas;
        this.respProyectos = a.proyectos;
        a.proyectos.forEach(element => {
          this.sql.insertProyectos(element.id, element.nombre, element.idCampo);
        });
        
        a.supervisores.forEach(element => {
          this.sql.insertUsuarios(element.id, element.nombre);
        });
        a.origen.forEach(element => {
          this.sql.insertCampos(element.id, element.nombreCampo, element.nroPlanta);
        });
        a.cuadrillas.forEach(element => {
          this.sql.insertCuadrillas(element.id, element.nombre);
        });
        a.trabajadores.forEach(element => {
          this.sql.insertTrabajadores(element.id,element.nombre, element.puesto, element.foto, element.qr, element.cuadrilla);
          this.file.checkDir(this.file.dataDirectory, `file:///data/data/io.ionic.starter/files/${element.foto}`).
        then(_ => console.log('Directory exists')).
        catch(err => {
          console.log('Directory doesn\'t exist');
          fileTransfer.download(``, this.file.dataDirectory + `${element.foto}`).then((entry) => {
          console.log('download complete: ' + entry.toURL());
          
        }, (error) => {
        });
        });
        
  
        });
        let hoy = new Date();
        let fecha = hoy.toISOString().substring(0,10);
        this.storage.setItem('fecha', {value: fecha})
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );
        loading.dismiss();
        this.presentToast();
      }
     }, error => {
      loading.dismiss();
      this.presentAlert('Error', 'No existe conexion a Internet, por favor conectese para poder sincronizar');
      console.log(error);
    });
    
    });
  
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscanerPage');
    if(this.camera === false){
      this.camera = true;
    }
  }

  ingresarManualmente(){
    this.manual = !this.manual ? true : false;
  }

  openScanner(){
   if(this.flash === true){
    this.qrS.prepare()
    .then((status: QRScannerStatus) => {
     this.qrS.show();
     this.qrS.enableLight();
     this.showCamera();
    
      if (status.authorized){
       let scanSub = this.qrS.scan().subscribe((text: string) => {
           this.qr = text;                 
           this.qrS.hide();
           this.qrS.disableLight();         
           this.hideCamera();          
           scanSub.unsubscribe();
           console.log(this.qr);
           this.data.qr = this.qr;
           if(this.qr === ''){
             this.presentAlert('Error', 'Hay uno o mas campos vacios');
             this.camera = true;
           } else {
             this.navCtrl.push(EscanerLogPage, this.data);
           }
        });
      } 
    }).catch((e: any) => console.log('error: ', e));
   } else {
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
           if(this.qr === ''){
             this.presentAlert('Error', 'Hay uno o mas campos vacios');
             this.camera = true;
           } else {
             this.navCtrl.push(EscanerLogPage, this.data);
           }
        });
      } 
    }).catch((e: any) => console.log('error: ', e));
   }
  
  }


  manualScan(){ 
      this.data.qr = this.qr;
      if(this.qr === ''){
        this.presentAlert('Error', 'Hay uno o mas campos vacios');
      } else {
        this.manual = false;
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
   this.camera = false;
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
    
  }

  ionViewWillLeave(){
    this.hideCamera();
    this.storage.setItem('flash', {value: this.flash})
    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }


  hideCamera() { 
    this.camera = true;
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    
  }

  

}
