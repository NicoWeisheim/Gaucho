import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { WelcomePage } from '../pages/welcome/welcome';
import { EscanerPage } from '../pages/escaner/escaner';
import { ListSolicitudesPage } from '../pages/list-solicitudes/list-solicitudes';
import { TrasladosListPage } from '../pages/traslados-list/traslados-list';
import { UserListPage } from '../pages/user-list/user-list';
import { ListCuadrillasPage } from '../pages/list-cuadrillas/list-cuadrillas';
import { TrasladoPage } from '../pages/traslado/traslado';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Welcome', component: WelcomePage },
      {title: 'Escaner QR', component: EscanerPage},
      {title: 'Solicitudes', component: ListSolicitudesPage},
      {title: 'Traslados', component: TrasladosListPage},
      {title: 'Usuarios', component: UserListPage},
      {title: 'Cuadrillas', component: ListCuadrillasPage},
      {title: 'Traslado', component: TrasladoPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
