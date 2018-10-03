import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Geolocation ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';
import { EscanerPage } from '../escaner/escaner';
import { NativeStorage } from '@ionic-native/native-storage';


interface trabajadores {
  id: number,
  nombre: string,
  puesto_id: number,
  foto: string,
  qr: number,
  cuadrilla_id: number
}

interface proyectos{
  id: number;
  nombre: string,
  campo_id:number
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

   proyectos: proyectos[] = [{
    id: 0,
    nombre: '',
    campo_id:0
  }];
  proye: proyectos[] = [{
    id: 0,
    nombre: '',
    campo_id: 0
  }];
  nombre: string;
  id: number;
  path: string;
  card1: boolean = false;
  cards: boolean = false;
  lastItem1: any;
  contador1: number = 0;
  data1: boolean = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private sql: SqlStorageProvider,
    private geolocation: Geolocation,
    private toastCtrl: ToastController,
    private storage: NativeStorage,
    private alertCtrl: AlertController) {
      this.qr = this.navParams.data.qr;
      this.storage.getItem('login')
      .then(
        data => {this.nombre = data.nombre; this.id = data.id},
        error => console.error(error)
      );
      this.storage.getItem('proyecto')
      .then(
        data => {this.proye[0] = data; this.lastItem1 = data; console.log(this.lastItem1)},
        error => console.log(error)
      )
      this.sql.getProyectos().then((data: proyectos[]) => {return data})
      .then((data) => this.proyectos = data);
     
      this.sql.getTrabajadorByQr(this.qr).then((data: trabajadores) => {
        console.log(data);
        this.trabajador = data; 
        this.path = `file:///data/data/io.ionic.starter/files/${data.foto}`;
        this.getLocation();
        if(data.id === 0){
          this.presentAlert('Error', 'No se encontraron trabajadores con ese QR');
          
        } else {
          this.exist = true;
        }
      }); 
          
  }

  ionViewDidLoad() {
    
    let hoy = new Date();
    this.hora = hoy.toTimeString().substring(0,8);

    }

    presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Escaneado correctamente',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }


  getLocation(){
    this.options = {
      enableHighAccuracy : false
      };
      this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
        this.location = pos.coords.latitude.toString().concat(',').concat(pos.coords.longitude.toString());
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
    if(this.proye[0].id === 0){
      this.presentAlert('Error', 'El campo proyecto no puede estar vacio');
   } else {
    this.sql.postLogs(fecha, 1, this.trabajador.id, this.id, this.location, this.proye[0].id, this.trabajador.cuadrilla_id);
    this.sql.getLogs();
    this.presentToast();
    this.setProyecto();
    this.navCtrl.setRoot(EscanerPage);
   }
    
  }

  egreso(){
    this.getLocation();
    let hoy = new Date();
    let fecha = hoy.toISOString().substring(0,10).concat(' ').concat(this.hora);
    console.log(fecha);
    if(this.proye[0].id === 0){
      this.presentAlert('Error', 'El campo proyecto no puede estar vacio');
    }else {
      this.sql.postLogs(fecha, 0, this.trabajador.id, this.id, this.location, this.proye[0].id, this.trabajador.cuadrilla_id);this.sql.getLogs();
      this.presentToast();
      this.setProyecto();
      this.navCtrl.setRoot(EscanerPage);
    }
    
  }

  ionViewWillLeave(){
   this.setProyecto();
  }

  setProyecto(){
    this.storage.setItem('proyecto', {id: this.proye[0].id, nombre: this.proye[0].nombre, campo_id: this.proye[0].campo_id})
    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }

  presentAlert(title, subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.navCtrl.pop();
          }
        },
      ]
    });
    alert.present();
  }

  itemTapped1($event, item){
    
    // if(this.proye.length === 0){
    //   if(this.proye.indexOf(item) === -1){
        
    //     this.proye.push(item);
    //     item.selected = true;
    //   } 
    //   }else if(this.proye.indexOf(item) != -1 && this.proye.length > 0){
    //     this.proye.splice(this.proye.indexOf(item),1);
    //     item.selected = false;
    //   }
    
    this.contador1++;
    if(this.contador1 === 1){
      this.proye.push(item);
      item.selected = true;
      this.lastItem1 = item;
    } else if(this.contador1 > 1){
      this.proye.pop();
      this.lastItem1.selected = false;
      this.proye.push(item);
      item.selected = true;
      this.lastItem1 = item;
    }
    if(this.proye.length === 2){
      this.proye.splice(0,1);
    }
  }

  okCard1(){
    this.card1 = false;
    this.exist = true;
    console.log(this.proye);
  }

  cancelCard1(){
    this.card1 = false;
    this.exist = true;
    if(this.data1 === false){
      this.proye = [{
        id: 0,
        nombre: '',
        campo_id: 0
      }];
    }
    
  }

  openCard1(){
    console.log(this.lastItem1);
    if(this.proye[0].id === 0){
      this.proye.pop();
    }
    else {
      this.data1 = true;
      this.lastItem1.selected = true;
    }
    if(this.data1 === false && this.contador1 >= 1){
      this.lastItem1.selected = false;
    }
    this.card1 = true;
    this.exist = false;
  }

}
