import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlStorageProvider {

  db: SQLiteObject;
  constructor(private sql: SQLite) { }

  initializeDataBase(){
    this.sql.create({
      name: 'track_mobile.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {   
        db.executeSql('CREATE TABLE IF NOT EXISTS campos (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, nombre_campo TEXT, numero_planta INTEGER)', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
        db.executeSql('CREATE TABLE IF NOT EXISTS cuadrillas (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, nombre_cuadrilla TEXT)', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
        db.executeSql('CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, fecha_hora TEXT, check_in_out INTEGER, id_trabajador INTEGER, id_usuario TEXT, gps INTEGER, id_proyecto INTEGER, id_cuadrilla INTEGER)', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
        db.executeSql('CREATE TABLE IF NOT EXISTS proyectos (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, nombre TEXT, campo_id INTEGER)', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
        db.executeSql('CREATE TABLE IF NOT EXISTS supervisores (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, nombre_cuadrilla TEXT)', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
        db.executeSql('CREATE TABLE IF NOT EXISTS trabajadores (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, nombre TEXT, puesto_id INTEGER, foto TEXT, qr TEXT, cuadrilla_id INTEGER)', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
    
    
      })
      .catch(e => console.log(e));
  }

    
}
