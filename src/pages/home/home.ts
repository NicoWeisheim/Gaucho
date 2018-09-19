import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: string;
  pw: string;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

  }

  goToWelcome(){
    if(this.user === '' || this.pw === ''){
      this.presentAlert('Error', 'Hay uno o mas campos vacios');
    } else {
      this.navCtrl.setRoot(WelcomePage);
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
