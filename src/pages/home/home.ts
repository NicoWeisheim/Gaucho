import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: string;
  pw: string;
  constructor(public navCtrl: NavController) {

  }

  goToWelcome(){
    this.navCtrl.setRoot(WelcomePage);
  }

}
