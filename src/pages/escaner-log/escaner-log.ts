import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';
import { EscanerPage } from '../escaner/escaner';


interface trabajadores {
  id: number,
  nombre: string,
  puesto_id: number,
  foto: string,
  qr: number,
  cuadrilla_id: number
}




@Component({
  selector: 'page-escaner-log',
  templateUrl: 'escaner-log.html',
})
export class EscanerLogPage {

  location: string = '';
  options: any;
  hora: string;
  exist: boolean = false;
  qr: string = '';
  trabajador: trabajadores = {
    id: 0,
    nombre: '',
    puesto_id: 0,
    foto: '',
    qr: 0,
    cuadrilla_id: 0
  };
  proyecto: string = '';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private sql: SqlStorageProvider,
    private geolocation: Geolocation,
    private toastCtrl: ToastController) {
      this.qr = this.navParams.data.qr;
      this.proyecto = this.navParams.data.proyecto;
      this.sql.getTrabajadorByQr(this.qr).then((data: trabajadores) => {
        this.trabajador = data; 
        console.log(this.trabajador);
        this.getLocation();
        console.log(this.location);}); 
        this.exist = !this.exist ? true : false;   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscanerLogPage');
    
    let hoy = new Date();
    this.hora = hoy.getHours().toLocaleString('es-ES').concat(':').concat(hoy.getMinutes().toLocaleString('es-ES'));

    }

    presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Escaneado correctamente',
        duration: 3000,
        position: 'bottom'
      });
    }

  
  getLocation(){
    this.options = {
      enableHighAccuracy : false
      };
      this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
        this.location = pos.coords.latitude.toString().concat(' + ').concat(pos.coords.longitude.toString());
        console.log(this.location);
      },(err : PositionError)=>{
          console.log("error : " + err.message);
      });
  }

  ingreso(){
    this.getLocation();
    let hoy = new Date();
    let fecha = hoy.toISOString().substring(0,10).concat(' ').concat(this.hora);
    console.log(fecha);
    this.sql.postLogs(fecha, 1, this.trabajador.id, 1, this.location, this.proyecto, this.trabajador.cuadrilla_id);
    this.sql.getLogs();
    this.presentToast();
    this.navCtrl.setRoot(EscanerPage);
  }

  egreso(){
    this.getLocation();
    let hoy = new Date();
    let fecha = hoy.toISOString().substring(0,10).concat(' ').concat(this.hora);
    console.log(fecha);
    this.sql.postLogs(fecha, 0, this.trabajador.id, 1, this.location, this.proyecto, this.trabajador.cuadrilla_id);this.sql.getLogs();
    this.presentToast();
    this.navCtrl.setRoot(EscanerPage);
  }

}
