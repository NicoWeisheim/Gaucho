import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';


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
  destino: campos[] = [{
    id: 0,
    nombre_campo: '',
    numero_planta: 0
  }];
  card1: boolean = false;
  cards: boolean = false;
  lastItem1: any;
  contador1: number = 0;
  btn1: boolean = true;
  data1: boolean = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     private sql: SqlStorageProvider,
     private toastCtrl: ToastController,
     private alertCtrl: AlertController) {
    this.sql.getCampos().then((data: campos[]) => this.campos = data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicitudPersonasPage');
  }

  confirmarSolicitud(){
    if(this.diaIngreso === '' || this.destino[0].id === 0){
      this.presentAlert('Error', 'Campos obligatorios vacios');
    }
    else {

      if(this.cantidad < 1){
        this.presentAlert('Error', 'La cantidad de personas tiene que ser mayor a 0');
      }
      else {
        let hoy = new Date();
        let fecha = hoy.getDate().toString().concat('/').concat(hoy.getMonth().toString()).concat('/').concat(hoy.getFullYear().toString());
        this.sql.postSolicitues(fecha, 1, this.cantidad, this.destino[0].id, this.diaIngreso ,0,this.observaciones).then(() => this.sql.getSolicitudes());
        this.presentToast();
        this.navCtrl.setRoot(SolicitudPersonasPage);
      }
     
    }
    
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Solicitud cargada correctamente',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  presentAlert(title, subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Ok']
    });
    alert.present();
  }

  itemTapped1($event, item){
    
    // if(this.destino.length === 0){
    //   if(this.destino.indexOf(item) === -1){
        
    //     this.destino.push(item);
    //     item.selected = true;
    //   } 
    //   }else if(this.destino.indexOf(item) != -1 && this.destino.length > 0){
    //     this.destino.splice(this.destino.indexOf(item),1);
    //     item.selected = false;
    //   }
    this.contador1++;
    if(this.contador1 === 1){
      this.destino.push(item);
      item.selected = true;
      this.lastItem1 = item;
    } else if(this.contador1 > 1){
      this.destino.pop();
      this.lastItem1.selected = false;
      this.destino.push(item);
      item.selected = true;
      this.lastItem1 = item;
    }
  }

  okCard1(){
    if(this.destino[0].id != 0){
      this.btn1 = false;
    }
    this.card1 = false;
    this.cards = false;
    console.log(this.destino);
  }

  cancelCard1(){
    this.card1 = false;
    this.cards = false;
    if(this.data1 === false){
      this.destino = [{
        id: 0,
        nombre_campo: '',
        numero_planta: 0
      }];
      this.btn1 = true;
    }
    
  }

  openCard1(){
    if(this.destino[0].id === 0){
      this.destino.pop();
    }
    else {
      this.data1 = true;
    }
    if(this.data1 === false && this.contador1 >= 1){
      this.lastItem1.selected = false;
    }
    this.card1 = true;
    this.cards = true;
  }
}
