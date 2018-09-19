import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { EscanerPage } from '../pages/escaner/escaner';
import { TrasladoPage } from '../pages/traslado/traslado';
import {SqlStorageProvider} from '../providers/sql-storage/sql-storage';
import { SolicitudPersonasPage } from '../pages/solicitud-personas/solicitud-personas';
import { LogsListPage } from '../pages/logs-list/logs-list';
import { SincronizarPage } from '../pages/sincronizar/sincronizar';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public sqlStorage: SqlStorageProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Welcome', component: WelcomePage },
      {title: 'Escaner QR', component: EscanerPage},
      {title: 'Traslado', component: TrasladoPage},
      {title: 'Solicitud de Personas', component: SolicitudPersonasPage},
      {title: 'Imprimir Asistencia', component: LogsListPage},
      {title: 'Sincronizar', component: SincronizarPage}
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
