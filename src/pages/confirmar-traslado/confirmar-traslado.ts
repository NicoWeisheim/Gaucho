import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';
import { WelcomePage } from '../welcome/welcome';

interface campos{
  id: number,
  nombre_campo: string,
  numero_planta: number
}

interface supervisores{
  id: number,
  nombre: string
}

interface trabajadores {
  id: number,
  nombre: string,
  puesto_id: number,
  foto: string,
  qr: number,
  cuadrilla_id: number
}

interface traslados {
  id: number,
  supervisor_id_origen: number,
  supervisor_id_destino: number,
  id_campo_origen: number,
  id_campo_destino: number,
  fecha: string,
  id_cuadrilla: number,
  sincronizado: number
}

interface datos {
  origen: string,
  supOri: string,
  fecha: string,
  destino: string,
  supDes: string
}

@Component({
  selector: 'page-confirmar-traslado',
  templateUrl: 'confirmar-traslado.html',
})
export class ConfirmarTrasladoPage {

  parame: any[];
  cabecillas: trabajadores[] = [{
    id: 0,
    nombre: '',
    puesto_id: 0,
    foto: '',
    qr: 0,
    cuadrilla_id: 0
  }];
  noAsign: trabajadores[] = [{
    id: 0,
    nombre: '',
    puesto_id: 0,
    foto: '',
    qr: 0,
    cuadrilla_id: 0
  }];;
  param: any[];
  datos: datos = {
    origen: '',
  supOri: '',
  fecha: '',
  destino: '',
  supDes: ''
  };
  supOri:  supervisores={
    id: 0,
    nombre: ''
  };
  origen: campos ={
    id: 0,
    nombre_campo: '',
    numero_planta: 0
  };
  supDes:  supervisores={
    id: 0,
    nombre: ''
  };
  destino:  campos={
    id: 0,
    nombre_campo: '',
    numero_planta: 0
  };


  fecha: string = '';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private sql: SqlStorageProvider,
    private loadingController: LoadingController,
    private toastCtrl: ToastController) {
    this.parame = this.navParams.data;
    this.param = this.parame[0];
    this.datos = this.parame[1];
    console.log(this.cabecillas);
    this.cabecillas.pop();
    let loading = this.loadingController.create({
      content: 'Getting data...'
    });
    loading.present().then(() => {
      this.sql.getSupervisoresById(this.datos.supOri).then((data: supervisores) => this.supOri = data);
      this.sql.getCamposById(this.datos.origen).then((data: campos) => this.origen = data);
      this.sql.getSupervisoresById(this.datos.supDes).then((data: supervisores) => this.supDes = data);
      this.sql.getCamposById(this.datos.destino).then((data: campos) => this.destino = data);
      for(let i = 0; i < this.param.length; i++){
        this.sql.getTrabajadorById(this.param[i]).then((data: trabajadores)=> this.cabecillas[i] = data);
      }
      this.fecha = this.datos.fecha
      loading.dismiss();
    });
  }

  ionViewDidLoad() {
   
  }

  confirmarTraslado(){
    let hoy = new Date();
    let fecha = hoy.getDate().toString().concat('/').concat(hoy.getMonth().toString()).concat('/').concat(hoy.getFullYear().toString());
    this.sql.postTraslados(this.supOri.id, this.supDes.id, this.origen.id, this.destino.id, this.fecha, this.cabecillas[0].cuadrilla_id);
    this.sql.getTraslados().then((data :traslados[]) => {
      console.log(data);
      for(let i = 0; i<this.param.length;i++){
        this.sql.postGrupoTraslados(data[data.length - 1].id, this.param[i], fecha);
      };
      this.sql.getGrupoTraslados();
      this.presentToast();
      this.navCtrl.setRoot(WelcomePage);
    })
    
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Traslado agregado correctamente',
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
