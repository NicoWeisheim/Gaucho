import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import {Http} from '@angular/http'
import { Observable } from '../../../node_modules/rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { NativeStorage } from '@ionic-native/native-storage';
import { EscanerPage } from '../escaner/escaner';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: string = '';
  pw: string = '';
  constructor(public navCtrl: NavController, 
    private alertCtrl: AlertController, 
    private http: Http, 
    private storage: NativeStorage,
    private loadingController: LoadingController,
    public events: Events) {

  }

  ionViewDidLoad() {
try {
  let loading = this.loadingController.create({
    content: 'Getting data...'
  });
  loading.present().then(() => {
  this.storage.getItem('login')
  .then(
    data => {
      console.log(data);
      setTimeout(1000);
      this.events.publish('user:logged');
      this.navCtrl.setRoot(EscanerPage); 
      },
    error => console.error(error)
  );
  loading.dismiss();
});
} catch (error) {
  console.log(error);
}

  }

  goToWelcome(){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    
    if(this.user === '' || this.pw === ''){
      this.presentAlert('Error', 'Hay uno o mas campos vacios');
    } else {
      let body: {} = {
        usuario: this.user,
        pass: this.pw
      }
      console.log(JSON.stringify(body));
      let loading = this.loadingController.create({
        content: 'Getting data...'
      });
      loading.present().then(() => {
      this.http.post('', {body:JSON.parse(JSON.stringify(body))})
      .subscribe((res) => 
      {console.log(res.json());
      let a = res.json();
      if(res.json().status === 1){
        console.log(res.json().user.token + ' ' + res.json().user.nombre);
        this.storage.setItem('login', {id: res.json().user.id,token: res.json().user.token, nombre: res.json().user.nombre, puesto: res.json().user.puesto, mail: this.user})
  .then(
    () => {console.log('Stored item!');
    this.events.publish('user:logged');  
  },
    error => console.error('Error storing item', error)
  );

  loading.dismiss();
  this.navCtrl.setRoot(EscanerPage);
      }
      else {
        loading.dismiss();
        this.presentAlert('Error', 'Usuario o contraseña incorrectos');
      }
       }, error => {
        loading.dismiss();
        this.presentAlert('Error', 'No existe conexion a Internet, por favor conectese para poder iniciar sesion');
        console.log(error);
      });
      
    });
      
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

}
