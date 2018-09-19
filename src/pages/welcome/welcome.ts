import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';

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

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  logs: logs[] = [{
    id: 0,
    fecha_hora: '',
    check_in_out: 0,
    id_trabajador: 0,
    id_usuario: 0,
    gps: '',
    id_proyecto: 0,
    id_cuadrilla: 0
  }];
  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sql: SqlStorageProvider) {
    this.pages = [
      { title: 'Welcome', component: WelcomePage }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    this.sql.getTraslados();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }

}
