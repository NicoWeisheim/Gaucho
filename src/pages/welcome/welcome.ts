import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pages = [
      { title: 'Welcome', component: WelcomePage }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }

}
