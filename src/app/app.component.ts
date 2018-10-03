import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { EscanerPage } from '../pages/escaner/escaner';
import { TrasladoPage } from '../pages/traslado/traslado';
import {SqlStorageProvider} from '../providers/sql-storage/sql-storage';
import { SolicitudPersonasPage } from '../pages/solicitud-personas/solicitud-personas';
import { LogsListPage } from '../pages/logs-list/logs-list';
import { SincronizarPage } from '../pages/sincronizar/sincronizar';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  nombre: string;
  mail: string;
  rootPage: any = HomePage;
  logged: boolean = false;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public sqlStorage: SqlStorageProvider,
     private storage: NativeStorage,
     public events: Events) {
      this.events.subscribe('user:logged', () => {
        this.storage.getItem('login')
      .then(
        data => {this.nombre = data.nombre; this.mail = data.mail; this.nombre = this.nombre.toUpperCase(); this.mail = this.mail.toUpperCase(); this.logged = true;},
        error => console.error(error)
      );
      })
      
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'ESCANER QR', component: EscanerPage},
      {title: 'TRASLADO', component: TrasladoPage},
      {title: 'SOLICITUD DE PERSONAS', component: SolicitudPersonasPage},
      {title: 'IMPRIMIR ASISTENCIA', component: LogsListPage},
      {title: 'SINCRONIZAR', component: SincronizarPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      this.sqlStorage.initializeDataBase();

      
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
