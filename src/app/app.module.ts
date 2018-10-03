import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpModule} from '@angular/http'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SQLite} from '@ionic-native/sqlite';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EscanerPage } from '../pages/escaner/escaner';
import {QRScanner} from '@ionic-native/qr-scanner';
import { AccordionComponent } from '../components/accordion/accordion';
import { ListCuadrillasPage } from '../pages/list-cuadrillas/list-cuadrillas';
import { SqlStorageProvider } from '../providers/sql-storage/sql-storage';
import { TrasladoPage } from '../pages/traslado/traslado';
import { SeleccionarPersonasPage } from '../pages/seleccionar-personas/seleccionar-personas';
import { ConfirmarTrasladoPage } from '../pages/confirmar-traslado/confirmar-traslado';
import {Geolocation} from "@ionic-native/geolocation";
import { SolicitudPersonasPage } from '../pages/solicitud-personas/solicitud-personas';
import { EscanerLogPage } from '../pages/escaner-log/escaner-log';
import { LogsListPage } from '../pages/logs-list/logs-list';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { SincronizarPage } from '../pages/sincronizar/sincronizar';
import { NativeStorage } from '@ionic-native/native-storage';
import { HTTP } from '@ionic-native/http';
import { FileTransfer } from '@ionic-native/file-transfer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EscanerPage,
    AccordionComponent,
    ListCuadrillasPage,
    TrasladoPage,
    SeleccionarPersonasPage,
    ConfirmarTrasladoPage,
    SolicitudPersonasPage,
    EscanerLogPage,
    LogsListPage,
    SincronizarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EscanerPage,
    AccordionComponent,
    ListCuadrillasPage,
    TrasladoPage,
    SeleccionarPersonasPage,
    ConfirmarTrasladoPage,
    SolicitudPersonasPage,
    EscanerLogPage,
    LogsListPage,
    SincronizarPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QRScanner,
    SQLite,
    SqlStorageProvider,
    Geolocation,
    File,
    FileOpener,
    NativeStorage,
    HTTP,
    File,
    FileTransfer
  ]
})
export class AppModule {}
