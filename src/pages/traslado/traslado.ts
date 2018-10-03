import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, DateTime } from 'ionic-angular';
import { SeleccionarPersonasPage } from '../seleccionar-personas/seleccionar-personas';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';

interface campos{
  id: number,
  nombre_campo: string,
  numero_planta: number
}

interface usuarios{
  id: number,
  nombre: string
}

interface datos {
  origen: number,
  supOri: number,
  fecha: string,
  destino: number,
  supDes: number
}

@Component({
  selector: 'page-traslado',
  templateUrl: 'traslado.html',
})



export class TrasladoPage {

  supervisores: usuarios[] = [{
    id: 0,
    nombre: ''
  }];
  supervisoresAux: usuarios[] = [{
    id: 0,
    nombre: ''
  }];
  fechaTraslado: string = '';
  datos: datos ={
    origen: 0,
    supOri: 0,
    fecha: '',
    destino: 0,
    supDes: 0
  };
  card1: boolean = false;
  card2: boolean = false;
  card3: boolean = false;
  card4: boolean = false;
  supOri1: usuarios[] =[{
    id: 0,
    nombre: ''
  }]
  supDes1: usuarios[] =[{
    id: 0,
    nombre: ''
  }]
  campos: campos[] =[{
    id: 0,
    nombre_campo: '',
    numero_planta: 0
  }];
  camposAux: campos[] =[{
    id: 0,
    nombre_campo: '',
    numero_planta: 0
  }];
  origen1:  campos[] =[{
    id: 0,
    nombre_campo: '',
    numero_planta: 0
  }];
  destino1:  campos[] =[{
    id: 0,
    nombre_campo: '',
    numero_planta: 0
  }];
  btn1: boolean = true;
  btn2: boolean = true;
  btn3: boolean = true;
  btn4: boolean = true;
  lastItem1: any;
  contador1: number = 0;
  lastItem2: any;
  contador2: number = 0;
  lastItem3: any;
  contador3: number = 0;
  lastItem4: any;
  contador4: number = 0;
  cards: boolean = false;
  data1: boolean = false;
  data2: boolean = false;
  data3: boolean = false;
  data4: boolean = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public sql: SqlStorageProvider,
    private alertCtrl: AlertController) {
    this.sql.getCampos().then((data: campos[]) => {this.campos = data; console.log(this.campos)});
    this.sql.getUsuarios().then((data: usuarios[]) => {this.supervisores = data});
    this.sql.getCampos().then((resp: campos[]) => {return resp})
    .then((resp) => this.camposAux = resp);
    this.sql.getUsuarios().then((users: usuarios[]) => {return users})
    .then((users) => this.supervisoresAux = users);
  }

  ionViewDidLoad() {
  }

  seleccionarPersonas(){
    this.datos = 
      {origen: this.origen1[0].id,
        supOri: this.supOri1[0].id,
        fecha: this.fechaTraslado,
        destino: this.destino1[0].id,
        supDes: this.supDes1[0].id
      }
    ;
     if(this.datos.origen === 0 || this.datos.destino === 0 || this.fechaTraslado === '' || this.datos.supOri === 0 || this.datos.supDes === 0){
      this.presentAlert('Error', 'Hay uno o mas campos vacios');
    }  else {
      if(this.datos.origen === this.datos.destino){
      this.presentAlert('Error', 'El origen y el destino no pueden ser el mismo');
    }
    else {
      if(this.datos.supOri === this.datos.supDes){
        this.presentAlert('Error', 'El supervisor de origen y el supervisor de destino no pueden ser el mismo');
      }else {
        this.navCtrl.push(SeleccionarPersonasPage, this.datos);
      }
      
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

  itemTapped1($event, item){

      // if(this.origen1.indexOf(item) === -1){
      //   this.contador1++;
      //   console.log(this.contador1);
      //   if(this.contador1 > 1){
      //     this.lastItem1.selected = false;
          
      //   }
      //   this.origen1.push(item);
      //   item.selected = true;
      //   this.lastItem1 = item;
      
      // }else if(this.origen1.indexOf(item) != -1 && this.origen1.length > 0){
      //   this.origen1.splice(this.origen1.indexOf(item),1);
      //   item.selected = false;
      // }

      this.contador1++;
      if(this.contador1 === 1){
        this.origen1.push(item);
        item.selected = true;
        this.lastItem1 = item;
      } else if(this.contador1 > 1){
        this.origen1.pop();
        this.lastItem1.selected = false;
        this.origen1.push(item);
        item.selected = true;
        this.lastItem1 = item;
      }
      
  }

  okCard1(){
    if(this.origen1[0].id != 0){
      this.btn1 = false;
    }
    this.card1 = false;
    this.cards = false;
    console.log(this.origen1);
  }

  cancelCard1(){
    this.card1 = false;
    this.cards = false;
    if(this.data1 === false){
      this.origen1 = [{
        id: 0,
        nombre_campo: '',
        numero_planta: 0
      }];
      this.btn1 = true;
    }
   
  }

  openCard1(){
    if(this.origen1[0].id === 0){
      this.origen1.pop();
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

  itemTapped2($event, item){
 
    // if(this.supOri1.length === 0){
    //   if(this.supOri1.indexOf(item) === -1){
        
    //     this.supOri1.push(item);
    //     item.selected = true;
    //   } 
    //   }else if(this.supOri1.indexOf(item) != -1 && this.supOri1.length > 0){
    //     this.supOri1.splice(this.supOri1.indexOf(item),1);
    //     item.selected = false;
    // }
       
    this.contador2++;
    if(this.contador2 === 1){
      this.supOri1.push(item);
      item.selected = true;
      this.lastItem2 = item;
    } else if(this.contador2 > 1){
      this.supOri1.pop();
      this.lastItem2.selected = false;
      this.supOri1.push(item);
      item.selected = true;
      this.lastItem2 = item;
    }
    
    
  }

  okCard2(){
    if(this.supOri1[0].id != 0){
      this.btn2 = false;
    }
    this.card2 = false;
    this.cards = false;
    console.log(this.supOri1);
  }

  cancelCard2(){
    this.card2 = false;
    this.cards = false;
    if(this.data2 === false){
      this.supOri1 = [{
        id: 0,
        nombre: ''
      }];
      this.btn2 = true;
    }
   
  }

  openCard2(){
    if(this.supOri1[0].id === 0){
      this.supOri1.pop();
    }
    else {
      this.data2 = true;
    }
    if(this.data2 === false && this.contador2 >= 1){
      this.lastItem2.selected = false;
    }
    this.card2 = true;
    this.cards = true;
  }


  itemTapped3($event, item){

    // if(this.destino1.length === 0){
    //   if(this.destino1.indexOf(item) === -1){
        
    //     this.destino1.push(item);
    //     item.selected = true;
    //   } 
    //   }else if(this.destino1.indexOf(item) != -1 && this.destino1.length > 0){
    //     this.destino1.splice(this.destino1.indexOf(item),1);
    //     item.selected = false;
    //   }
    this.contador3++;
    if(this.contador3 === 1){
      this.destino1.push(item);
      item.selected = true;
      this.lastItem3 = item;
    } else if(this.contador3 > 1){
      this.destino1.pop();
      this.lastItem3.selected = false;
      this.destino1.push(item);
      item.selected = true;
      this.lastItem3 = item;
    }
  }

  okCard3(){
    if(this.destino1[0].id != 0){
      this.btn3 = false;
    }
    this.card3 = false;
    this.cards = false;
    console.log(this.destino1);
  }

  cancelCard3(){
    this.card3 = false;
    this.cards = false;
    if(this.data3 === false){
      this.destino1 = [{
        id: 0,
        nombre_campo: '',
        numero_planta: 0
      }];
      this.btn3 = true;
    }
    
  }

  openCard3(){
    if(this.destino1[0].id === 0){
      this.destino1.pop();
    }
    else {
      this.data3 = true;
    }
    if(this.data3 === false && this.contador3 >= 1){
      this.lastItem3.selected = false;
    }
    this.card3 = true;
    this.cards = true;
  }

  itemTapped4($event, item){
    
    // if(this.supDes1.length === 0){
    //   if(this.supDes1.indexOf(item) === -1){
        
    //     this.supDes1.push(item);
    //     item.selected = true;
    //   } 
    //   }else if(this.supDes1.indexOf(item) != -1 && this.supDes1.length > 0){
    //     this.supDes1.splice(this.supDes1.indexOf(item),1);
    //     item.selected = false;
    // }
   
    this.contador4++;
    if(this.contador4 === 1){
      this.supDes1.push(item);
      item.selected = true;
      this.lastItem4 = item;
    } else if(this.contador4 > 1){
      this.supDes1.pop();
      this.lastItem4.selected = false;
      this.supDes1.push(item);
      item.selected = true;
      this.lastItem4 = item;
    }
    
    
  }

  okCard4(){
    if(this.supDes1[0].id != 0){
      this.btn4 = false;
    }
    this.card4 = false;
    this.cards = false;
    console.log(this.supDes1);
  }

  cancelCard4(){
    
    this.card4 = false;
    this.cards = false;
    if(this.data4 === false){
      this.supDes1 = [{
        id: 0,
        nombre: ''
      }];
      this.btn4 = true;
    }
    
    
  }

  openCard4(){  
    if(this.supDes1[0].id === 0){
      this.supDes1.pop();
    } else {
      this.data4 = true;
    }
    if(this.data4 === false && this.contador4 >= 1){
      this.lastItem4.selected = false;
    }
    this.card4 = true;
    this.cards = true;
  }

}
