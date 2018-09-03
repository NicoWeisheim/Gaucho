import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlStorageProvider {

  db: SQLiteObject;
  constructor(private sql: SQLite) { }

}
