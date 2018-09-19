import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';
import { WelcomePage } from '../welcome/welcome';

interface campos{
  id: number,
  nombre_campo: string,
  numero_planta: number
}
@Component({
  selector: 'page-solicitud-personas',
  templateUrl: 'solicitud-personas.html',
})
export class SolicitudPersonasPage {

  public campos: campos[];
  diaIngreso: string = '';
  observaciones: string = '';
  cantidad: number;
  destino: string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     private sql: SqlStorageProvider,
     private toastCtrl: ToastController) {
    this.sql.getCampos().then((data: campos[]) => this.campos = data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicitudPersonasPage');
  }

  confirmarSolicitud(){
    let hoy = new Date();
    let fecha = hoy.getDate().toString().concat('/').concat(hoy.getMonth().toString()).concat('/').concat(hoy.getFullYear().toString());
    this.sql.postSolicitues(fecha, 1, this.cantidad, this.destino, this.diaIngreso, 0).then(() => this.sql.getSolicitudes());
    this.presentToast();
    this.navCtrl.setRoot(WelcomePage);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Solicitud cargada correctamente',
      duration: 3000,
      position: 'bottom'
    });
  }
}
