import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

interface campos{
  id: number,
  nombre_campo: string,
  numero_planta: number
}

interface grupo_traslado{
  id: number,
  id_traslado: number,
  id_trabajador: number,
  fecha_creacion: string
}

interface puestos{
  id: number,
  nombre: string
}

interface usuarios {
  id: number,
  nombre: string
}

interface solicitudes{
  id: number,
  fecha: string,
  supervisor_id: number,
  cantidad_personas: number,
  id_campo_destino: number,
  fecha_ingreso: string,
  sincronizado: number,
  observaciones: string
}

interface cuadrillas {
  id: number,
  nombre_cuadrilla: string
}

interface trabajadores {
  id: number,
  nombre: string,
  puesto_id: number,
  foto: string,
  qr: string,
  cuadrilla_id: number
}

interface traslados {
  id: number,
  supervisor_id_origen: number,
  supervisor_id_destino: number,
  id_campo_origen: number,
  id_campo_destino: number,
  fecha: string,
  id_cuadrilla: number,
  sincronizado: number
}

interface proyectos{
  id: number;
  nombre: string,
  campo_id:number
}

interface logs{
  id: number,
  fecha_hora: string,
  check_in_out: number,
  id_trabajador: number,
  id_usuario: number,
  gps: string,
  id_proyecto: number,
  id_cuadrilla: number,
  sincronizado: number
}


@Injectable()
export class SqlStorageProvider {

  db: SQLiteObject;
  constructor(private sql: SQLite) { }

  initializeDataBase(){
    this.sql.create({name: 'track_mobile.db', location: 'default', createFromLocation: 1}).then((db) =>
    {
      this.db = db;
      this.db.executeSql('CREATE TABLE IF NOT EXISTS puestos(id INTEGER PRIMARY KEY, nombre TEXT);', []);
      this.db.executeSql('CREATE TABLE IF NOT EXISTS usuarios(id INTEGER PRIMARY KEY, nombre TEXT);', []);
      this.db.executeSql('CREATE TABLE IF NOT EXISTS grupo_traslado(id INTEGER PRIMARY KEY, id_traslado INTEGER, id_trabajador INTEGER, fecha_creacion TEXT);',[]);
      this.db.executeSql('CREATE TABLE IF NOT EXISTS solicitudes(id INTEGER PRIMARY KEY, fecha TEXT, supervisor_id INTEGER, cantidad_personas INTEGER, id_campo_destino INTEGER, fecha_ingreso TEXT ,sincronizado INTEGER, observaciones TEXT);',[]);
      this.db.executeSql('INSERT OR REPLACE INTO puestos(id,nombre) VALUES(0,"Admin")', []);
      this.db.executeSql('INSERT OR REPLACE INTO puestos(id,nombre) VALUES(1,"Supervisor")', []);
      this.db.executeSql('INSERT OR REPLACE INTO puestos(id,nombre) VALUES(2,"Proveedor")', []);
      this.db.executeSql('INSERT OR REPLACE INTO puestos(id,nombre) VALUES(3,"Capataz")', []);
      this.db.executeSql('INSERT OR REPLACE INTO puestos(id,nombre) VALUES(4,"Peon cabecilla")', []);
      this.db.executeSql('INSERT OR REPLACE INTO puestos(id,nombre) VALUES(5,"Peon")', []);
      this.db.executeSql('INSERT OR REPLACE INTO puestos(id,nombre) VALUES(6,"Cocinero")', []);
      this.db.executeSql('INSERT OR REPLACE INTO puestos(id,nombre) VALUES(7,"Maestranza")', []);
      
    });
}

getCampos(){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from campos', []).then((data) => {
      let campo: campos[] = [{
        id: 0,
        nombre_campo: '',
        numero_planta: 0
      }]
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          campo[i] = data.rows.item(i);
            // [{
            //   id: data.rows.item(i).id,
            //   nombre_campo: data.rows.item(i).nombre_campo,
            //   numero_planta: data.rows.item(i).numero_planta
            // }]
        }
      }
      console.log(campo);
      resolve(campo);
    }, (error) => {
      reject(error);
    })
  });
}

 getProyectos(): Promise<proyectos[]>{
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from proyectos', []).then((data) => {
      let proyectos: proyectos[] =[{
        id: 0,
        nombre: '',
        campo_id:0
      }];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          proyectos[i] = data.rows.item(i);
        }
      }
      console.log(proyectos);
      resolve(proyectos);
    }, (error) => {
      reject(error);
    })
  });
}

getUsuarios(){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from usuarios', []).then((data) => {
      let usuarios: usuarios[] = [{id: 0, nombre: ''}];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          usuarios[i] = data.rows.item(i); 
         
        }
      }
      console.log(usuarios);
      resolve(usuarios);
    }, (error) => {
      reject(error);
    })
  });
}

getCamposById(id){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from campos WHERE id in (?)', [id]).then((data) => {
      let campo: campos;
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          //campo.push(data.rows.item(i));
          campo = 
            {
              id: data.rows.item(i).id,
              nombre_campo: data.rows.item(i).nombre_campo,
              numero_planta: data.rows.item(i).numero_planta
            }
          
        }
      }     
      resolve(campo);
    }, (error) => {
      reject(error);
    })
  });
}

 getProyectosById(id){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from proyectos where campo_id in (?)', [id]).then((data) => {
      let proyectos: proyectos;
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          proyectos = 
            {
              id: data.rows.item(i).id,
              nombre: data.rows.item(i).nombre,
              campo_id: data.rows.item(i).campo_id
            }
        }
      }
      resolve(proyectos);
    }, (error) => {
      reject(error);
    })
  });
}

getUsuariosById(id){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from usuarios where id in (?)', [id]).then((data) => {
      let supervisore: usuarios;
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          // supervisores.push(data.rows.item(i));
          supervisore = 
            {
              id: data.rows.item(i).id,
              nombre: data.rows.item(i).nombre
            }
          
        }
      }
      resolve(supervisore);
    }, (error) => {
      reject(error);
    })
  });
}

getTrabajadorByQr(qr){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from trabajadores where qr in (?)', [qr]).then((data) => {
      let trabajador: trabajadores = {
        id: 0,
        nombre: '',
        foto: '',
        qr: '',
        cuadrilla_id: 0,
        puesto_id: 0
      };
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          // trabajadores.push(data.rows.item(i));
          trabajador = {
            id: data.rows.item(i).id,
            nombre: data.rows.item(i).nombre,
            puesto_id: data.rows.item(i).puesto_id,
            foto: data.rows.item(i).foto,
            qr: data.rows.item(i).qr,
            cuadrilla_id: data.rows.item(i).cuadrilla_id
          }
        }
      }
      resolve(trabajador);
    }, (error) => {
      reject(error);
    })
  });
}

getTrabajadoresNoAsignados(){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from trabajadores where puesto_id = "6" or puesto_id = "7"', []).then((data) => {
      let trabajador: trabajadores[]=[{
        id: 0,
        nombre: '',
        puesto_id: 0,
        foto: '',
        qr: '',
        cuadrilla_id: 0
      }];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          trabajador[i] = data.rows.item(i);
        }
      }
      resolve(trabajador);
    }, (error) => {
      reject(error);
    })
  });
}

public async getTrabajadoresByCuadrilla(id){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from trabajadores where cuadrilla_id IN (?)', [id]).then((data) => {
      let trabajador: trabajadores[]=[{
        id: 0,
        nombre: '',
        puesto_id: 0,
        foto: '',
        qr: '',
        cuadrilla_id: 0
      }];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          trabajador[i] = data.rows.item(i);
        }
      }
      resolve(trabajador);
    }, (error) => {
      reject(error);
    })
  });
}

getTrabajadores(): Promise<trabajadores[]>{
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from trabajadores', []).then((data) => {
      let trabajador: trabajadores[]=[{
        id: 0,
        nombre: '',
        puesto_id: 0,
        foto: '',
        qr: '',
        cuadrilla_id: 0
      }];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          trabajador[i] = data.rows.item(i);
        }
      }
      console.log(trabajador);
      resolve(trabajador);
    }, (error) => {
      reject(error);
    })
  });
}

getCabecillas(){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from trabajadores where puesto_id = "4"', []).then((data) => {
      let trabajador: trabajadores[]=[{
        id: 0,
        nombre: '',
        puesto_id: 0,
        foto: '',
        qr: '',
        cuadrilla_id: 0
      }];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          trabajador[i] = data.rows.item(i);
        }
      }
      resolve(trabajador);
    }, (error) => {
      reject(error);
    })
  });
}

getIntegrantesCuadrilla(cuadrilla_id){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from trabajadores where cuadrilla_id in (?)', [cuadrilla_id]).then((data) => {
      let trabajador: trabajadores[]=[{
        id: 0,
        nombre: '',
        puesto_id: 0,
        foto: '',
        qr: '',
        cuadrilla_id: 0
      }];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          trabajador[i] = data.rows.item(i);
        }
      }
      
      resolve(trabajador);
    }, (error) => {
      reject(error);
    })
  });
}

getCabecillasById(cuadrilla_id){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from trabajadores where puesto_id = "4" and cuadrilla_id in (?)', [cuadrilla_id]).then((data) => {
      let trabajador: trabajadores;
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          trabajador = {
            id: data.rows.item(i).id,
            nombre: data.rows.item(i).nombre,
            puesto_id: data.rows.item(i).puesto_id,
            foto: data.rows.item(i).foto,
            qr: data.rows.item(i).qr,
            cuadrilla_id: data.rows.item(i).cuadrilla_id
          }
        }
      }
      resolve(trabajador);
    }, (error) => {
      reject(error);
    })
  });
}

getTrabajadorById(id){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from trabajadores where id in (?)', [id]).then((data) => {
      let trabajador: trabajadores;
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          trabajador = {
            id: data.rows.item(i).id,
            nombre: data.rows.item(i).nombre,
            puesto_id: data.rows.item(i).puesto_id,
            foto: data.rows.item(i).foto,
            qr: data.rows.item(i).qr,
            cuadrilla_id: data.rows.item(i).cuadrilla_id
          }
        }
      }
      resolve(trabajador);
    }, (error) => {
      reject(error);
    })
  });
}

postTraslados(supervisor_id_origen, supervisor_id_destino, id_campo_origen, id_campo_destino, fecha, id_cuadrilla){
  return new Promise((resolve, reject) => {
    this.db.executeSql('INSERT INTO traslados(supervisor_id_origen, supervisor_id_destino, id_campo_origen, id_campo_destino, fecha, id_cuadrilla, sincronizado) VALUES (?,?,?,?,?,?,0)', [supervisor_id_origen, supervisor_id_destino, id_campo_origen, id_campo_destino, fecha, id_cuadrilla]).then((data) => {
      resolve(data);
   }, (error) => {reject(error);})
  })
    
}

getTraslados(): Promise<traslados[]>{
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from traslados', []).then((data) => {
      let traslados: traslados[] =  [           
        {
         id: 0,
         supervisor_id_origen: 0,
         supervisor_id_destino: 0,
         id_campo_origen: 0,
         id_campo_destino: 0,
         fecha: '',
         id_cuadrilla: 0,
         sincronizado: 0
       }
       ];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          traslados[i] = data.rows.item(i);
        }
      }
      console.log(traslados);
      resolve(traslados);
    }, (error) => {
      reject(error);
    })
  });
}

getTrasladosById(id): Promise<traslados>{
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from traslados where id in (?)', [id]).then((data) => {
      let traslados: traslados  =        
        {
         id: 0,
         supervisor_id_origen: 0,
         supervisor_id_destino: 0,
         id_campo_origen: 0,
         id_campo_destino: 0,
         fecha: '',
         id_cuadrilla: 0,
         sincronizado: 0
       }

      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          traslados.id = data.rows.item(i).id;
          traslados.supervisor_id_origen = data.rows.item(i).supervisor_id_origen,
          traslados.supervisor_id_destino = data.rows.item(i).supervisor_id_destino,
          traslados.id_campo_origen = data.rows.item(i).id_campo_origen,
          traslados.id_campo_destino = data.rows.item(i).id_campo_destino,
          traslados.fecha = data.rows.item(i).fecha,
          traslados.id_cuadrilla = data.rows.item(i).id_cuadrilla,
          traslados.sincronizado = data.rows.item(i).sincronizado
        }
      }
      console.log(traslados);
      resolve(traslados);
    }, (error) => {
      reject(error);
    })
  });
}

postLogs(fecha_hora, check_in_out, id_trabajador, id_usuario, gps, id_proyecto, id_cuadrilla){
  return new Promise((resolve, reject) => {
    this.db.executeSql('INSERT INTO logs(fecha_hora, check_in_out, id_trabajador, id_usuario, gps, id_proyecto, id_cuadrilla, sincronizado) VALUES (?,?,?,?,?,?,?, 0)', [fecha_hora, check_in_out, id_trabajador, id_usuario, gps, id_proyecto, id_cuadrilla]).then((data) => {
      console.log(data);
      resolve(data);
   }, (error) => {reject(error);})
  })
  
}

postGrupoTraslados(id_traslado, id_trabajador, fecha_creacion){
  return new Promise((resolve, reject) => {
    this.db.executeSql('INSERT INTO grupo_traslado(id_traslado, id_trabajador, fecha_creacion) VALUES (?,?,?)', [id_traslado, id_trabajador, fecha_creacion]).then((data) => {
      console.log(data);
      resolve(data);
   }, (error) => {reject(error);})
  })
  
}

postSolicitues(fecha, supervisor_id, cantidad_personas, id_campo_destino, fecha_ingreso ,sincronizado,observaciones){
  return new Promise((resolve, reject) => {
    this.db.executeSql('INSERT INTO solicitudes(fecha, supervisor_id, cantidad_personas, id_campo_destino, fecha_ingreso ,sincronizado,observaciones) VALUES (?,?,?,?,?,?,?)', [fecha, supervisor_id, cantidad_personas, id_campo_destino, fecha_ingreso ,sincronizado,observaciones]).then((data) => {
      console.log(data);
      resolve(data);
   }, (error) => {reject(error);})
  })
  
}

getSolicitudes(){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from solicitudes', []).then((data) => {
      let solicitudes: solicitudes[] =  [           
        {
          id: 0,
          fecha: '',
          supervisor_id: 0,
          cantidad_personas: 0,
          id_campo_destino: 0,
          fecha_ingreso: '',
          observaciones: '',
          sincronizado: 0
       }
       ];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          solicitudes[i] = data.rows.item(i);
        }
      }
      console.log(solicitudes);
      resolve(solicitudes);
    }, (error) => {
      reject(error);
    })
  });
  
}

getGrupoTraslados(){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from grupo_traslado', []).then((data) => {
      let grupo: grupo_traslado[] =  [           
        {
          id: 0,
          id_traslado: 0,
          id_trabajador: 0,
          fecha_creacion: ''
       }
       ];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          grupo[i] = data.rows.item(i);
        }
      }
      console.log(grupo);
      resolve(grupo);
    }, (error) => {
      reject(error);
    })
  });
  
}

getGrupoTrasladosByTraslado(id){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from grupo_traslado where id_traslado in (?)', [id]).then((data) => {
      let grupo: grupo_traslado[] =  [           
        {
          id: 0,
          id_traslado: 0,
          id_trabajador: 0,
          fecha_creacion: ''
       }
       ];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          grupo[i] = data.rows.item(i);
        }
      }
      console.log(grupo);
      resolve(grupo);
    }, (error) => {
      reject(error);
    })
  });
  
}

getGrupoTrasladosByTrabajador(id){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from grupo_traslado where id_trabajador in (?)', [id]).then((data) => {
      let grupo: grupo_traslado[] =  [           
        {
          id: 0,
          id_traslado: 0,
          id_trabajador: 0,
          fecha_creacion: ''
       }
       ];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          grupo[i] = data.rows.item(i);
        }
      }
    
      resolve(grupo);
    }, (error) => {
      reject(error);
    })
  });
  
}

getLogs(): Promise<logs[]>{
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from logs', []).then((data) => {
      let logs: logs[] = [           
       {
        id: 0,
        fecha_hora: '',
        check_in_out: 0,
        id_trabajador: 0,
        id_usuario: 0,
        gps: '',
        id_proyecto: 0,
        id_cuadrilla: 0,
        sincronizado: 0
      }
      ];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          logs.push(data.rows.item(i)); 
         
        }
      }
   
      resolve(logs);
    }, (error) => {
      reject(error);
    })
  });
}


getTrasladosByCuadrilla(id_cuadrilla){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from traslados where id_cuadrilla in (?)', [id_cuadrilla]).then((data) => {
      let traslados: traslados[] = [           
       {
        id: 0,
        supervisor_id_origen: 0,
        supervisor_id_destino: 0,
        id_campo_origen: 0,
        id_campo_destino: 0,
        fecha: '',
        id_cuadrilla: 0,
        sincronizado: 0
      }
      ];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          traslados[i] = data.rows.item(i); 
        }
      }
      
      resolve(traslados);
    }, (error) => {
      reject(error);
    })
  });
}

getCuadrillaById(id){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from cuadrillas where id in (?)', [id]).then((data) => {
      let cuadrilla: cuadrillas;
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          // trabajadores.push(data.rows.item(i));
          cuadrilla = {
            id: data.rows.item(i).id,
            nombre_cuadrilla: data.rows.item(i).nombre_cuadrilla,
            
          }
        }
      }
      resolve(cuadrilla);
    }, (error) => {
      reject(error);
    })
  });
}

getCuadrilla(){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from cuadrillas', []).then((data) => {
      let cuadrilla: cuadrillas[] = [{
        id: 0,
        nombre_cuadrilla: ''
      }];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          // trabajadores.push(data.rows.item(i));
          cuadrilla[i] = data.rows.item(i);
        }
      }
      console.log(cuadrilla);
      resolve(cuadrilla);
    }, (error) => {
      reject(error);
    })
  });
}

getPuestosById(id){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from puestos where id in (?)', [id]).then((data) => {
      let puesto: puestos;
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          // trabajadores.push(data.rows.item(i));
          puesto = {
            id: data.rows.item(i).id,
            nombre: data.rows.item(i).nombre,
            
          }
        }
      }
      resolve(puesto);
    }, (error) => {
      reject(error);
    })
  });
}

getPuestos(){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from puestos', []).then((data) => {
      let puesto: puestos[] = [{
        id: 0,
        nombre: ''
      }];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          // trabajadores.push(data.rows.item(i));
          puesto[i] = data.rows.item(i);
        }
      }
      console.log(puesto)
      resolve(puesto);
    }, (error) => {
      reject(error);
    })
  });
}

getTrasladosSinSincronizar(): Promise<traslados[]>{
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from traslados where sincronizado = 0', []).then((data) => {
      let traslados: traslados[] =  [           
        {
         id: 0,
         supervisor_id_origen: 0,
         supervisor_id_destino: 0,
         id_campo_origen: 0,
         id_campo_destino: 0,
         fecha: '',
         id_cuadrilla: 0,
         sincronizado: 0
       }
       ];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          traslados[i] = data.rows.item(i);
        }
      }
      console.log(traslados);
      resolve(traslados);
    }, (error) => {
      reject(error);
    })
  });
}

getLogsSinSincronizar(): Promise<logs[]>{
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from logs where sincronizado = 0', []).then((data) => {
      let logs: logs[] = [           
       {
        id: 0,
        fecha_hora: '',
        check_in_out: 0,
        id_trabajador: 0,
        id_usuario: 0,
        gps: '',
        id_proyecto: 0,
        id_cuadrilla: 0,
        sincronizado: 0
      }
      ];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          logs[i] = data.rows.item(i); 
         
        }
      }
   
      resolve(logs);
    }, (error) => {
      reject(error);
    })
  });
}

getSolicitudesSinSincronizar(){
  return new Promise((resolve, reject) => {
    this.db.executeSql('SELECT * from solicitudes where sincronizado = 0', []).then((data) => {
      let solicitudes: solicitudes[] =  [           
        {
          id: 0,
          fecha: '',
          supervisor_id: 0,
          cantidad_personas: 0,
          id_campo_destino: 0,
          fecha_ingreso: '',
          observaciones: '',
          sincronizado: 0
       }
       ];
      if (data.rows.length > 0) {
        for(let i=0; i <data.rows.length; i++) {
          solicitudes[i] = data.rows.item(i);
        }
      }
      console.log(solicitudes);
      resolve(solicitudes);
    }, (error) => {
      reject(error);
    })
  });
  
}

updateTrasladoSincronizado(){
  return new Promise((resolve, reject) => {
    this.db.executeSql('UPDATE traslados SET sincronizado = 1 where sincronizado = 0', []).then((data) => {
      
      resolve(data);
   }, (error) => {reject(error);})
  })
  
}

updateSolicitudesSincronizado(){
  return new Promise((resolve, reject) => {
    this.db.executeSql('UPDATE solicitudes SET sincronizado = 1 where sincronizado = 0', []).then((data) => {
      
      resolve(data);
   }, (error) => {reject(error);})
  })
  
}

updateLogsSincronizado(){
  return new Promise((resolve, reject) => {
    this.db.executeSql('UPDATE logs SET sincronizado = 1 where sincronizado = 0', []).then((data) => {
      
      resolve(data);
   }, (error) => {reject(error);})
  })
  
}

insertProyectos(id, nombre, campo){
      return new Promise((resolve, reject) => {
        this.db.executeSql('INSERT or REPLACE INTO proyectos VALUES (?,?,?)', [id, nombre, campo]).then((data) => {
          
          resolve(data);
       }, (error) => {reject(error);})
      })
    }

    insertCuadrillas(id, nombre){
      return new Promise((resolve, reject) => {
        this.db.executeSql('INSERT or REPLACE INTO cuadrillas VALUES (?,?)', [id, nombre]).then((data) => {
          
          resolve(data);
       }, (error) => {reject(error);})
      })
    }

    insertCampos(id, nombre_campo, numero_planta){
      return new Promise((resolve, reject) => {
        this.db.executeSql('INSERT or REPLACE INTO campos VALUES (?,?,?)', [id, nombre_campo, numero_planta]).then((data) => {
          
          resolve(data);
       }, (error) => {reject(error);})
      })
    }

    insertTrabajadores(id,nombre, puesto_id, foto, qr, cuadrilla_id){
      
      return new Promise((resolve, reject) => {
        this.db.executeSql('INSERT or REPLACE INTO trabajadores VALUES (?,?,?,?,?,?)', [id, nombre, puesto_id, foto, qr, cuadrilla_id]).then((data) => {
          
          resolve(data);
       }, (error) => {reject(error);})
      })
    }

    insertUsuarios(id, nombre){
      return new Promise((resolve, reject) => {
        this.db.executeSql('INSERT or REPLACE INTO usuarios VALUES (?,?)', [id, nombre]).then((data) => {
          
          resolve(data);
       }, (error) => {reject(error);})
      })
    }

    getUsuariosByNombre(nombre){
      return new Promise((resolve, reject) => {
        this.db.executeSql('SELECT * from usuarios where nombre in (?)', [nombre]).then((data) => {
          let usuarios: usuarios[] = [{id: 0, nombre: ''}];
          if (data.rows.length > 0) {
            for(let i=0; i <data.rows.length; i++) {
              usuarios[i] = data.rows.item(i); 
             
            }
          }
          console.log(usuarios);
          resolve(usuarios);
        }, (error) => {
          reject(error);
        })
      });
    }
    getUsuarioById(id){
      return new Promise((resolve, reject) => {
        this.db.executeSql('SELECT * from usuarios where id in (?)', [id]).then((data) => {
          let usuarios: usuarios = {id: 0, nombre: ''};
          if (data.rows.length > 0) {
            for(let i=0; i <data.rows.length; i++) {
              usuarios = data.rows.item(i); 
             
            }
          }
          console.log(usuarios);
          resolve(usuarios);
        }, (error) => {
          reject(error);
        })
      });
    }
}
