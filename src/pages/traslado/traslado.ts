import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, DateTime } from 'ionic-angular';
import { SeleccionarPersonasPage } from '../seleccionar-personas/seleccionar-personas';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';

interface campos{
  id: number,
  nombre_campo: string,
  numero_planta: number
}

interface supervisores{
  id: number,
  nombre: string
}

interface datos {
  origen: string,
  supOri: string,
  fecha: string,
  destino: string,
  supDes: string
}

@Component({
  selector: 'page-traslado',
  templateUrl: 'traslado.html',
})



export class TrasladoPage {

  supervisores: supervisores[];
  origen: string = '';
  destino: string = '';
  supOri: string = '';
  supDes: string = '';
  fechaTraslado: string = '';
  datos: datos ;
  public campos: campos[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public sql: SqlStorageProvider,
    private alertCtrl: AlertController) {
    this.sql.getCampos().then((data: campos[]) => this.campos = data);
    this.sql.getSupervisores().then((data: supervisores[]) => {this.supervisores = data;});
  }

  ionViewDidLoad() {
  }

  seleccionarPersonas(){
    this.datos = 
      {origen: this.origen,
        supOri: this.supOri,
        fecha: this.fechaTraslado,
        destino: this.destino,
        supDes: this.supDes
      }
    ;
     if(this.origen === '' || this.destino === '' || this.fechaTraslado === '' || this.supOri === '' || this.supDes === ''){
      this.presentAlert('Error', 'Hay uno o mas campos vacios');
    }  else {
      if(this.origen === this.destino){
      this.presentAlert('Error', 'El origen y el destino no pueden ser el mismo');
    }
    else {
      this.navCtrl.push(SeleccionarPersonasPage, this.datos);
    }
      
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

}
