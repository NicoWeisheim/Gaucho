import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';
import {Http, Jsonp} from '@angular/http'
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';



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

interface grupo_traslado{
  id: number,
  id_traslado: number,
  id_trabajador: number,
  fecha_creacion: string
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
  sincronizado: number,
  observaciones: string
}

interface trabajadores {
  id: number,
  nombre: string,
  puesto_id: number,
  foto: string,
  qr: string,
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
  sincronizado: 0,
  observaciones: ''
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
  grupo: grupo_traslado[] = [{
    id: 0,
    id_traslado: 0,
    id_trabajador: 0,
    fecha_creacion: ''
  }];
  trabajadores: trabajadores[] =[{
    id: 0,
  nombre: '',
  puesto_id: 0,
  foto: '',
  qr: '',
  cuadrilla_id: 0
  }]
  data: any;

  respTrabajadores: trabajadores[] =[{
    id: 0,
  nombre: '',
  puesto_id: 0,
  foto: '',
  qr: '',
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
  
  respCuadrillas: cuadrillas[] =[{
    id: 0,
    nombre_cuadrilla: ''
  }]
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private sql: SqlStorageProvider,
    private http: Http,
    private storage: NativeStorage,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private transfer: FileTransfer, 
    private file: File) {

      this.actualizarContador();
      this.sql.getTrabajadores().then((tra: trabajadores[]) => {return tra})
      .then((tra) => this.trabajadores = tra);
      this.sql.getGrupoTraslados().then((gru: grupo_traslado[]) => {return gru})
      .then((gru) => this.grupo = gru);
      this.storage.getItem('login')
      .then(
        data => this.data = data,
        error => console.error(error)
      );
     
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SincronizarPage');
  }

  syncCarga(){
    let hoy = new Date();
    let hora = hoy.toTimeString().substring(0,8);
    let body:{};
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    if(this.logs[0].id === 0){
      this.logs.pop();
    }
    if(this.solicitudes[0].id === 0){
      this.solicitudes.pop();
    }
    if(this.traslados[0].id === 0){
      this.traslados.pop();
    }
   
    let logs = [];
    for(let i = 0; i < this.logs.length; i++){
      logs[i] = {
        fecha: this.logs[i].fecha_hora,
        check_in_out: this.logs[i].check_in_out,
        id_trabajador: this.logs[i].id_trabajador,
        id_usuario: this.logs[i].id_usuario,
        id_proyecto: this.logs[i].id_proyecto,
        id_cuadrilla: this.logs[i].id_cuadrilla,
        gps: this.logs[i].gps
       };
    }
    
    let solicitudes = [];
    for(let i = 0; i < this.solicitudes.length; i++){
      solicitudes[i] = {
        cantidadPersonas: this.solicitudes[i].cantidad_personas,
        diaIngreso: this.solicitudes[i].fecha_ingreso.concat(' ').concat(hora),
        idDestino: this.solicitudes[i].id_campo_destino,
        observaciones: this.solicitudes[i].observaciones
        
       };
    }

    let traslados =[] ;
    for(let i = 0; i < this.traslados.length; i++){
      let g = 0;
      let cuadrillas: [{}]= [{
             idTrabajador: 0,
                 tipo: 0
           }];
      for(let j = 0; j < this.grupo.length; j++){
        if(this.traslados[i].id === this.grupo[j].id_traslado){
          for(let h = 0; h < this.trabajadores.length; h++){
            if(this.grupo[j].id_trabajador === this.trabajadores[h].id){
              cuadrillas[g] = {
                idTrabajador: this.trabajadores[h].id,
                puestoId: this.trabajadores[h].puesto_id
              };
              g++;
            }
          }
        }
        traslados[i] = {
          origenId: this.traslados[i].id_campo_origen,
          supervisorOrigenId: this.traslados[i].supervisor_id_origen,
          destinoId: this.traslados[i].id_campo_destino,
          supervisorDestinoId: this.traslados[i].supervisor_id_destino,
          fecha: this.traslados[i].fecha.concat(' ').concat(hora),
          idCuadrilla: this.traslados[i].id_cuadrilla,
          cuadrilla: cuadrillas
          };

        }
      }
    body = {
      token: [{value: this.data.token}],
      logs: logs,
      solicitudPersonas: solicitudes,
      traslados: traslados
    };
    console.log(JSON.stringify(body));
    let loading = this.loadingController.create({
      content: 'Getting data...'
    });
    loading.present().then(() => {
    this.http.post('', {body:JSON.parse(JSON.stringify(body))})
      .map((data) => 
      {
        let a = data.json();
        console.log(a);
        console.log(a[0].status + '' + a[0].result);
      if(a[0].status === 1 && a[0].result === 1){
        
                this.sql.updateLogsSincronizado().then(() => {
                  this.sql.updateSolicitudesSincronizado();
                }).then(() => {
                  this.sql.updateTrasladoSincronizado();
                  
                }).then(()=> {
                  console.log('Sincronizado');
                  this.actualizarContador();
                  loading.dismiss();
                  this.presentToast();
                })
      }
      }
      
      )
      .subscribe(data => {
        
       }, error => {
        loading.dismiss();
        this.presentAlert('Error', 'No existe conexion a Internet, por favor conectese para poder sincronizar');
        
      });
     
    });
  }

  syncDescarga(){
    let body = {token: [{value: this.data.token}]};
    const fileTransfer: FileTransferObject = this.transfer.create();
    let loading = this.loadingController.create({
      content: 'Getting data...'
    });
    
    loading.present().then(() => {
    this.http.post('', {body:JSON.parse(JSON.stringify(body))})
    .subscribe(data => {
      let a = data.json();
      
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
          
          fileTransfer.download(``, this.file.dataDirectory + `${element.foto}`).then((entry) => {
          
          
        }, (error) => {
        });
        });
        
  
        });
        let hoy = new Date();
        let fecha = hoy.toISOString().substring(0,10);
        this.storage.setItem('fecha', {value: fecha})
        .then(
          () => { this.syncCarga();},
          error => console.error('Error storing item', error)
        );
        loading.dismiss();
        this.presentToast();
      }
     }, error => {
      loading.dismiss();
      this.presentAlert('Error', 'No existe conexion a Internet, por favor conectese para poder sincronizar');
      
    });
    
    });
  
  }

  

  actualizarContador(){
    this.sql.getLogsSinSincronizar().then((data: logs[]) => {return data})
      .then((data) => {   
      this.cantAsist = data.length; 
      this.logs = data;
      if(this.logs[0].id === 0){
        this.cantAsist = 0;
    };
  });
      this.sql.getTrasladosSinSincronizar().then((tras: traslados[]) => {return tras})
      .then((tras) =>{
      this.cantTraslados = tras.length; 
      this.traslados = tras;
      if(this.traslados[0].id === 0){
        this.cantTraslados= 0;
      };
    });
      this.sql.getSolicitudesSinSincronizar().then((sol: solicitudes[]) => {return sol})
      .then((sol) => { 
      this.cantSolicitudes = sol.length; 
      this.solicitudes = sol;
      if(this.solicitudes[0].id === 0){
        this.cantSolicitudes=0;
      };
    });
  }

  presentAlert(title, subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Ok']
    });
    alert.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Sincronizacion completa',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
}
}

