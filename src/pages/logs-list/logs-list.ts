import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
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
  qr: number,
  cuadrilla_id: number
}

interface cuadrillas {
  id: number,
  nombre_cuadrilla: string
}


interface proyectos{
  id: number,
  nombre: string,
  campo_id:number
}

@Component({
  selector: 'page-logs-list',
  templateUrl: 'logs-list.html',
})
export class LogsListPage {

  fecha: string;
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

   lista: datos[] = [           
    {
     id: 0,
     fecha_hora: '',
     check_in_out: 0,
     trabajador: '',
     usuario: 0,
     gps: '',
     proyecto: '',
     cuadrilla: ''
   }]
   list: datos[] = [           
    {
     id: 0,
     fecha_hora: '',
     check_in_out: 0,
     trabajador: '',
     usuario: 0,
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
    qr: 0,
    cuadrilla_id: 0
   }];
   pdfObj = null;
   data: boolean = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private sql: SqlStorageProvider,
    private file: File, 
    private fileOpener: FileOpener,
    private plt: Platform) {
    
    let hoy = new Date();
    this.fecha = hoy.toISOString().substring(0,10);
    
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogsListPage');
  }

 async filter(){
  // this.sql.getLogs().then((data: logs[]) => this.logs = data)
  // .then(() => this.sql.getTrabajadores().then((tra: trabajadores[]) => this.trabajador = tra))
  // .then(() => this.sql.getProyectos().then((pro: proyectos[])=> this.proyecto = pro))
  // .then(() => this.sql.getCuadrilla().then((cua: cuadrillas[]) => this.cuadrilla = cua))
  // .then(() => {
  //   let h = 0;
  //   for(let i = 0; i<this.logs.length; i++){
  //     if(this.logs[i].fecha_hora.includes(this.fecha)){
  //       for(let j = 0; j<this.trabajador.length; j++){
  //         if(this.logs[i].id_trabajador === this.trabajador[j].id){
  //           this.lista[h].trabajador = this.trabajador[j].nombre;
  //         }
  //       }
  //       for(let j = 0; j < this.proyecto.length; j++){
  //         if(this.logs[i].id_proyecto === this.proyecto[j].id){
  //           this.lista[h].proyecto = this.proyecto[j].nombre;
  //         }
  //       }
  //       for(let j = 0; j < this.cuadrilla.length; j++){
  //         if(this.logs[i].id_cuadrilla === this.cuadrilla[j].id){
  //           this.lista[h].cuadrilla = this.cuadrilla[j].nombre_cuadrilla;
  //         }
  //       }
  //       this.lista[h].id = this.logs[i].id;
  //       this.lista[h].check_in_out = this.logs[i].check_in_out;
  //       this.lista[h].fecha_hora = this.logs[i].fecha_hora;
  //       this.lista[h].gps = this.logs[i].fecha_hora;
  //       this.lista[h].usuario = this.logs[i].id_usuario;
  //       h++;
  //     }
  //   }this.list = this.lista;
  // })


  // for(let i = 0; i < this.lista.length; i++){
  //      this.lista.pop();
  //    }
  //  try {
  //   this.logs = await this.sql.getLogs();
  //  } catch (error) {
  //    console.log(error);
  //  }
   
  //  let h = 0;
    
  //      try {
  //       this.trabajador = await this.sql.getTrabajadores();

  //      } catch (error) {
  //        console.log(error);
  //      }
  //     try {
  //       this.cuadrilla = await this.sql.getCuadrilla();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     try {
  //       this.proyecto = await this.sql.getProyectos();

  //     } catch (error) {
  //       console.log(error);
  //     }

  //     for(let i = 0; i < this.logs.length; i++){
  //       if(this.logs[i].fecha_hora.includes(this.fecha)){
  //         for(let j = 0; j < this.trabajador.length; j++){
  //           if(this.logs[i].id_trabajador === this.trabajador[j].id){
  //             this.lista[h].trabajador = this.trabajador[j].nombre;
  //           }
  //         }
  //         for(let j = 0; j < this.proyecto.length; j++){
  //           if(this.logs[i].id_proyecto === this.proyecto[j].id){
  //             this.lista[h].proyecto = this.proyecto[j].nombre;
  //           }
  //         }
  //         for(let j = 0; j < this.cuadrilla.length; j++){
  //           if(this.logs[i].id_cuadrilla === this.cuadrilla[j].id){
  //             this.lista[h].cuadrilla = this.cuadrilla[j].nombre_cuadrilla;
  //           }
  //         }
  //     this.lista[h].id = this.logs[i].id;
  //     this.lista[h].check_in_out = this.logs[i].check_in_out;
  //     this.lista[h].fecha_hora = this.logs[i].fecha_hora;
  //     this.lista[h].gps = this.logs[i].gps;
  //     this.lista[h].usuario = this.logs[i].id_usuario;
  //     h++
  //       }
  //     }
    
   


   console.log(this.lista);
  for(let i = 0; i < this.lista.length; i++){
    this.lista.pop();
  }
  let j = 0;
  this.sql.getLogs().then((data: logs[]) => {return data}).then((data) => {
    for(let i = 0; i< data.length; i++){
      if(data[i].fecha_hora.includes(this.fecha)){
        console.log(data[i].fecha_hora.includes(this.fecha));
        this.sql.getTrabajadorById(data[i].id_trabajador).then((res: trabajadores) => {return res})
        .then((res) => {this.lista[j].trabajador = res.nombre; console.log(res);
        this.sql.getCuadrillaById(data[i].id_cuadrilla).then((cuad: cuadrillas) => {return cuad})
        .then((cuad) => {
          this.lista[j].cuadrilla = cuad.nombre_cuadrilla;
          this.sql.getProyectosById(data[i].id_proyecto).then((proy: proyectos) => {return proy})
          .then((proy) => {
            console.log(proy);
            this.lista[j].proyecto = proy.nombre;
            this.lista[j].id = data[i].id;
            this.lista[j].check_in_out = data[i].check_in_out;
            this.lista[j].fecha_hora = data[i].fecha_hora;
            this.lista[j].gps = data[i].gps;
            this.lista[j].usuario = data[i].id_usuario;
            j++;
           
          })
        })
        });
      }
    }
  })
   console.log(this.lista);
  }

  export(){
    var docDefinition = {
      content: [
        { text: 'Trabajador', style: 'header' },
        { text: this.lista[0].trabajador},
 
        { text: 'Fecha y Hora', style: 'subheader' },
        { text: this.lista[0].fecha_hora },
 
        { text: 'Coordenadas', style: 'subheader' },
        {text: this.lista[0].gps},

        { text: 'Cuadrilla', style: 'subheader' },
        {text: this.lista[0].cuadrilla},

        { text: 'Proyecto', style: 'subheader' },
        {text: this.lista[0].proyecto},

        { text: 'Escaneado por', style: 'subheader' },
        {text: this.lista[0].usuario},

        { text: 'Check In/Out', style: 'subheader' },
        {text: this.lista[0].check_in_out},
 

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.downloadPdf();
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'logs.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'logs.pdf', 'application/pdf');
        })
      });
    }
  }

}
