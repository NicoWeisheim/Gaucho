import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {SQLite} from '@ionic-native/sqlite';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { EscanerPage } from '../pages/escaner/escaner';
import { ListSolicitudesPage } from '../pages/list-solicitudes/list-solicitudes';
import {QRScanner} from '@ionic-native/qr-scanner';
import { AccordionComponent } from '../components/accordion/accordion';
import { TrasladosListPage } from '../pages/traslados-list/traslados-list';
import { UserListPage } from '../pages/user-list/user-list';
import { ListCuadrillasPage } from '../pages/list-cuadrillas/list-cuadrillas';
import { SqlStorageProvider } from '../providers/sql-storage/sql-storage';
import { TrasladoPage } from '../pages/traslado/traslado';
import { SeleccionarPersonasPage } from '../pages/seleccionar-personas/seleccionar-personas';
import { ConfirmarTrasladoPage } from '../pages/confirmar-traslado/confirmar-traslado';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    EscanerPage,
    ListSolicitudesPage,
    AccordionComponent,
    TrasladosListPage,
    UserListPage,
    ListCuadrillasPage,
    TrasladoPage,
    SeleccionarPersonasPage,
    ConfirmarTrasladoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    EscanerPage,
    ListSolicitudesPage,
    AccordionComponent,
    TrasladosListPage,
    UserListPage,
    ListCuadrillasPage,
    TrasladoPage,
    SeleccionarPersonasPage,
    ConfirmarTrasladoPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QRScanner,
    SQLite,
    SqlStorageProvider
  ]
})
export class AppModule {}
