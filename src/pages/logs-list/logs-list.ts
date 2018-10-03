import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { NativeStorage } from '@ionic-native/native-storage';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

interface logs{
  id: number,
  fecha_hora: string,
  check_in_out: number,
  id_trabajador: number,
  id_usuario: number,
  gps: string,
  id_proyecto: number,
  id_cuadrilla: number
}

interface datos{
  id: number
  fecha_hora: string,
  check_in_out: number,
  trabajador: string,
  usuario: number,
  gps: string,
  proyecto: string,
  cuadrilla: string
}

interface trabajadores {
  id: number,
  nombre: string,
  puesto_id: number,
  foto: string,
  qr: string,
  cuadrilla_id: number
}

interface cuadrillas {
  id: number,
  nombre_cuadrilla: string
}

interface data{
  id: string,
  fecha_hora: string,
  check_in_out: string,
  trabajador: string,
  usuario: string,
  gps: string,
  proyecto: string,
  cuadrilla: string
}

interface proyectos{
  id: number,
  nombre: string,
  campo_id:number
}
interface usuarios {
  id: number,
  nombre: string
}
@Component({
  selector: 'page-logs-list',
  templateUrl: 'logs-list.html',
})
export class LogsListPage {

  fecha: string = '';
  logs: 
  logs[] = [           
    {
     id: 0,
     fecha_hora: '',
     check_in_out: 0,
     id_trabajador: 0,
     id_usuario: 0,
     gps: '',
     id_proyecto: 0,
     id_cuadrilla: 0
   }
   ];
   supervisor: usuarios[] =[{
    id:0,
    nombre: ''
  }]
   
   list: data[] = [           
    {
     id: '',
     fecha_hora: '',
     check_in_out: '',
     trabajador: '',
     usuario: '',
     gps: '',
     proyecto: '',
     cuadrilla: ''
   }]
   cuadrilla: 
    cuadrillas[] = [{
    id: 0,
    nombre_cuadrilla: ''
   }];
   proyecto : proyectos[] = [{
    id: 0,
    nombre: '',
    campo_id:0
   }];
   trabajador: 
   trabajadores[] = [{
    id: 0,
    nombre: '',
    puesto_id: 0,
    foto: '',
    qr: '',
    cuadrilla_id: 0
   }];
   pdfObj = null;
   data: boolean = false;
   nombre: string;
   id: number;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private sql: SqlStorageProvider,
    private file: File, 
    private fileOpener: FileOpener,
    private plt: Platform,
    private storage: NativeStorage,
    private alertCtrl: AlertController) {
      this.storage.getItem('login')
      .then(
        data => {this.nombre = data.nombre; this.id = data.id},
        error => console.error(error)
      );
    this.sql.getLogs().then((data: logs[]) => {return data})
    .then((data) => this.logs = data);
    this.sql.getTrabajadores().then((tra: trabajadores[]) => {return tra})
    .then((tra) => this.trabajador = tra);
    this.sql.getCuadrilla().then((cuad: cuadrillas[]) => {return cuad})
    .then((cuad) => {this.cuadrilla = cuad; console.log(cuad)});
    this.sql.getProyectos().then((pro: proyectos[]) => {return pro})
    .then((pro) => this.proyecto = pro);
    this.list.pop();
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogsListPage');
  }

  presentAlert(title, subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Ok']
    });
    alert.present();
  }

  filter(){
    this.data = false;
    let lista: data[]= [           
      {
       id: '',
       fecha_hora: '',
       check_in_out: '',
       trabajador: '',
       usuario: '',
       gps: '',
       proyecto: '',
       cuadrilla: ''
     }]
     let g = 0;
    for(let i = 0; i < this.logs.length; i++){
      let tra = '';
      let cuad = '';
      let pro = '';
      if(this.logs[i].fecha_hora.includes(this.fecha)){
        for(let j = 0; j < this.trabajador.length; j++){
          if(this.logs[i].id_trabajador === this.trabajador[j].id){
            tra = this.trabajador[j].nombre;
          }
        }
        for(let j = 0; j < this.proyecto.length; j++){
          if(this.logs[i].id_proyecto === this.proyecto[j].id){
            pro = this.proyecto[j].nombre;
          };
        };
        for(let j = 0; j < this.cuadrilla.length; j++){
          if(this.logs[i].id_cuadrilla === this.cuadrilla[j].id){
            cuad = this.cuadrilla[j].nombre_cuadrilla;
          };
        };
        
        lista[g] = {
          id: this.logs[i].id.toString(),
          fecha_hora: this.logs[i].fecha_hora,
          check_in_out: this.logs[i].check_in_out.toString(),
          trabajador: tra,
          usuario: this.nombre,
          gps: this.logs[i].gps,
          proyecto: pro,
          cuadrilla: cuad
        };
        g++;
      
      }
    }
    if(g > 0){
      this.data = true;
    }
    console.log(this.data);
    console.log(lista);
    this.list = lista;
  
  }

  export(){

    if(this.fecha === ''){
      this.presentAlert('Advertencia', 'Ingrese el filtro de fecha para tener asistencias');
    } else {
      var docDefinition = {
        content: [
         
        ]

    }
    

    this.list.forEach(element => {
          docDefinition.content.push({
            style: 'header',
        ul: [{text: 'Trabajador: ' + element.trabajador.toString()},
        {text:'Fecha y hora: '+ element.fecha_hora.toString() },
        {text:'Check In/Out: '+ element.check_in_out.toString() },
        {text:'GPS: '+ element.gps.toString() },
        {text:'Cuadrilla: '+ element.cuadrilla.toString() },
        {text:'Proyecto: '+ element.proyecto.toString() },
        {text:'Escaneado por: '+ element.usuario.toString() },
        {text:'_________________________________________________________________________________________' },
        
        
        ]
          })
    });
  

    this.pdfObj = pdfMake.createPdf(docDefinition);
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.externalApplicationStorageDirectory, `logs_${this.fecha}.pdf`, blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.externalApplicationStorageDirectory + `logs_${this.fecha}.pdf`, 'application/pdf');
        })
      });
    }
  }
    }
  
    

}
