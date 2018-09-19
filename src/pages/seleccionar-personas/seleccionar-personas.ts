import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ListCuadrillasPage } from '../list-cuadrillas/list-cuadrillas';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';

interface trabajadores {
  id: number,
  nombre: string,
  puesto_id: number,
  foto: string,
  qr: number,
  cuadrilla_id: number
}

interface datos {
  origen: string,
  supOri: string,
  fecha: string,
  destino: string,
  supDes: string
}

@Component({
  selector: 'page-seleccionar-personas',
  templateUrl: 'seleccionar-personas.html',
})
export class SeleccionarPersonasPage {

  noAsignados: trabajadores[];
  cabecillas: trabajadores[];
  personasFilter: string = 'cabecillas';
  list: trabajadores[];
  filter: boolean = true;
  datos: datos = {
    origen: '',
  supOri: '',
  fecha: '',
  destino: '',
  supDes: ''
  };
  cantPersonas: number;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private sql: SqlStorageProvider,
    private loadingController: LoadingController) {
      let loading = this.loadingController.create({
        content: 'Getting data...'
      });
      loading.present().then(() => {
        this.datos = this.navParams.data;
        this.sql.getTrabajadoresNoAsignados().then((data: trabajadores[]) => this.noAsignados = data);
        this.sql.getCabecillas().then((data: trabajadores[]) => {this.list = data; this.cabecillas = data;});
        loading.dismiss();
      })
      
  }

  ionViewDidLoad() {
  }

  filterPersonas(){
    if(this.personasFilter === 'cabecillas'){
      this.list = this.cabecillas;
      this.filter = true;
    } else {
      this.list = this.noAsignados;
      this.filter = false;
    };
  }

  itemTapped($event, cuad){
    this.navCtrl.push(ListCuadrillasPage, [cuad, this.datos]);
  }

}
