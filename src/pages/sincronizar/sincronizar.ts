import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';

interface logs{
  id: number,
  fecha_hora: string,
  check_in_out: number,
  id_trabajador: number,
  id_usuario: number,
  gps: string,
  id_proyecto: number,
  id_cuadrilla: number,
  sincronizado: number
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

interface solicitudes{
  id: number,
  fecha: string,
  supervisor_id: number,
  cantidad_personas: number,
  id_campo_destino: number,
  fecha_ingreso: string,
  sincronizado: number
}

@Component({
  selector: 'page-sincronizar',
  templateUrl: 'sincronizar.html',
})
export class SincronizarPage {

  cantTraslados: number;
  cantSolicitudes: number;
  cantAsist: number;
  logs: logs[] = [{
    id: 0,
  fecha_hora: '',
  check_in_out: 0,
  id_trabajador: 0,
  id_usuario: 0,
  gps: '',
  id_proyecto: 0,
  id_cuadrilla: 0,
  sincronizado: 0
  }]
  solicitudes: solicitudes[] = [{
    id: 0,
  fecha: '',
  supervisor_id: 0,
  cantidad_personas: 0,
  id_campo_destino: 0,
  fecha_ingreso: '',
  sincronizado: 0
  }]

  traslados: traslados[] = [{
    id: 0,
    supervisor_id_origen: 0,
    supervisor_id_destino: 0,
    id_campo_origen: 0,
    id_campo_destino: 0,
    fecha: '',
    id_cuadrilla: 0,
    sincronizado: 0
  }]
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private sql: SqlStorageProvider) {
      this.logs.pop();
      this.solicitudes.pop();
      this.traslados.pop();
      this.sql.getLogsSinSincronizar().then((data: logs[]) => {return data})
      .then((data) => {this.cantAsist = data.length; this.logs = data});
      this.sql.getTrasladosSinSincronizar().then((tras: traslados[]) => {return tras})
      .then((tras) =>{ this.cantTraslados = tras.length; this.traslados = tras});
      this.sql.getSolicitudesSinSincronizar().then((sol: solicitudes[]) => {return sol})
      .then((sol) => {this.cantSolicitudes = sol.length; this.solicitudes = sol});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SincronizarPage');
  }

  sincronizar(){
    this.sincronizarLogs();
    this.sincronizarSolicitudes();
    this.sincronizarTraslados();
  }

  sincronizarLogs(){
    
    console.log(this.logs);
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let body = [];
    for(let i = 0; i < this.logs.length; i++){
       body[i] = [{
        id: this.logs[i].id,
        fecha_hora: this.logs[i].fecha_hora,
        check_in_out: this.logs[i].check_in_out,
        id_trabajador: this.logs[i].id_trabajador,
        id_usuario: this.logs[i].id_usuario,
        gps: this.logs[i].gps,
        id_proyecto: this.logs[i].id_proyecto,
        id_cuadrilla: this.logs[i].id_cuadrilla,
        sincronizado: 1
       }]
    }
    console.log(JSON.stringify(body));
    
  }

  sincronizarSolicitudes(){
    
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let body = [];
    for(let i = 0; i < this.solicitudes.length; i++){
       body[i] = [{
        id: this.solicitudes[i].id,
        fecha: this.solicitudes[i].fecha,
        supervisor_id: this.solicitudes[i].supervisor_id,
        cantidad_personas: this.solicitudes[i].cantidad_personas,
        id_campo_destino: this.solicitudes[i].id_campo_destino,
        fecha_ingreso: this.solicitudes[i].fecha_ingreso,
        sincronizado: 1
       }]
    }
    console.log(JSON.stringify(body));
    
  }

  sincronizarTraslados(){
    
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let body = [];
    for(let i = 0; i < this.traslados.length; i++){
       body[i] = [{
        id: this.traslados[i].id,
        supervisor_id_origen: this.traslados[i].supervisor_id_origen,
        supervisor_id_destino: this.traslados[i].supervisor_id_destino,
        id_campo_origen: this.traslados[i].id_campo_origen,
        id_campo_destino: this.traslados[i].id_campo_destino,
        fecha: this.traslados[i].fecha,
        id_cuadrilla: this.traslados[i].id_cuadrilla,
        sincronizado: 1
       }]
    }
    console.log(JSON.stringify(body));
    
  }
}
