import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';
import { TrasladoPage } from '../traslado/traslado';

interface campos{
  id: number,
  nombre_campo: string,
  numero_planta: number
}

interface usuarios{
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

interface listNoAsi{
  id: number,
  nombre: string,
  puesto: string
}

interface puestos{
  id: number,
  nombre: string
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
  supOri:  usuarios={
    id: 0,
    nombre: ''
  };
  origen: campos ={
    id: 0,
    nombre_campo: '',
    numero_planta: 0
  };
  supDes:  usuarios={
    id: 0,
    nombre: ''
  };
  destino:  campos={
    id: 0,
    nombre_campo: '',
    numero_planta: 0
  };

  listNoAsi: listNoAsi[] = [{
    id: 0,
    nombre: '',
    puesto: ''
  }];
  fecha: string = '';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private sql: SqlStorageProvider,
    private loadingController: LoadingController,
    private toastCtrl: ToastController) {
    this.parame = this.navParams.data;
    let g = 0;
    let h = 0;
  
    this.param = this.parame[0];
    this.datos = this.parame[1];
    console.log(this.cabecillas);
    this.cabecillas.pop();
    let loading = this.loadingController.create({
      content: 'Getting data...'
    });
    loading.present().then(() => {
      this.sql.getUsuarioById(this.datos.supOri).then((data: usuarios) => {this.supOri = data; console.log(this.supOri)});
      this.sql.getCamposById(this.datos.origen).then((data: campos) => this.origen = data);
      this.sql.getUsuarioById(this.datos.supDes).then((data: usuarios) => {this.supDes = data; console.log(this.supDes)});
      this.sql.getCamposById(this.datos.destino).then((data: campos) => this.destino = data);
      for(let i = 0; i < this.param.length; i++){
        console.log(this.param[i]);
        this.sql.getTrabajadorById(this.param[i]).then((data: trabajadores)=> {
          console.log(data);
          if(data.puesto_id === 6 || data.puesto_id === 7){
            this.sql.getPuestosById(data.puesto_id).then((res: puestos) => {return res})
            .then((res) => {
              this.listNoAsi[g].nombre = data.nombre;
              this.listNoAsi[g].id = data.id;
              this.listNoAsi[g].puesto = res.nombre;
              g++;
            })
          }
          else {
            this.cabecillas[h] = data;
            h++;
          }
        });
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
    if(this.cabecillas.length < 1){
      this.sql.postTraslados(this.supOri.id, this.supDes.id, this.origen.id, this.destino.id, this.fecha, 0);
    }else {
      this.sql.postTraslados(this.supOri.id, this.supDes.id, this.origen.id, this.destino.id, this.fecha, this.cabecillas[0].cuadrilla_id);
    }
    
    this.sql.getTraslados().then((data :traslados[]) => {
      console.log(data);
      for(let i = 0; i<this.param.length;i++){
        this.sql.postGrupoTraslados(data[data.length - 1].id, this.param[i], fecha);
      };
      this.sql.getGrupoTraslados();
      this.presentToast();
      this.navCtrl.setRoot(TrasladoPage);
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
