import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ListCuadrillasPage } from '../list-cuadrillas/list-cuadrillas';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';
import {ConfirmarTrasladoPage} from '../confirmar-traslado/confirmar-traslado';
interface trabajadores {
  id: number,
  nombre: string,
  puesto_id: number,
  foto: string,
  qr: number,
  cuadrilla_id: number
}

interface datos {
  origen: string,
  supOri: string,
  fecha: string,
  destino: string,
  supDes: string
}

interface listNoAsi{
  id: number,
  nombre: string,
  puesto: string
}

interface puestos{
  id: number,
  nombre: string
}
interface grupo_traslado{
  id: number,
  id_traslado: number,
  id_trabajador: number,
  fecha_creacion: string
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
@Component({
  selector: 'page-seleccionar-personas',
  templateUrl: 'seleccionar-personas.html',
})
export class SeleccionarPersonasPage {

  noAsignados: trabajadores[]= [{
    id: 0,
    nombre: '',
    puesto_id: 0,
    foto: '',
    qr: 0,
    cuadrilla_id: 0
  }];
  cabecillas: trabajadores[];
  personasFilter: string = 'cabecillas';
  list: trabajadores[];
  filter: boolean = true;
  datos: datos = {
    origen: '',
  supOri: '',
  fecha: '',
  destino: '',
  supDes: ''
  };
  listNoAsi: listNoAsi[] = [{
    id: 0,
    nombre: '',
    puesto: ''
  }];
  finalList: any[] = [{}];
  cantPersonas: number;
  noAsi: boolean = false;
  noSeleccionables: trabajadores[]= [{
    id: 0,
    nombre: '',
    puesto_id: 0,
    foto: '',
    qr: 0,
    cuadrilla_id: 0
  }];;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private sql: SqlStorageProvider,
    private loadingController: LoadingController) {
      this.noSeleccionables.pop();
      let loading = this.loadingController.create({
        content: 'Getting data...'
      });
      loading.present().then(() => {
        this.datos = this.navParams.data;
        this.noAsignados.pop();
        this.sql.getTrabajadoresNoAsignados().then((data: trabajadores[]) => {return data})
      .then((data) => {
        console.log('t '+data);
        for(let i =0; i<data.length; i++){
          this.sql.getGrupoTrasladosByTrabajador(data[i].id).then((res: grupo_traslado[]) => {
            if(res[res.length-1].id != 0){
            return res;}
          else{
            this.noAsignados.push(data[i]);
            console.log('integrante');
          }})
          .then((res) => 
          {
            console.log('g '+res[res.length-1].id_traslado);
          this.sql.getTrasladosById(res[res.length-1].id_traslado).then((tras: traslados) => {return tras})
            .then((tras) => {
              console.log('m '+tras.id_campo_destino);
              console.log('d '+ this.datos.origen)
              if(tras.id_campo_destino.toString() === this.datos.origen){
                this.noAsignados.push(data[i]);
                console.log('integrante');
              }
              else {
                this.noSeleccionables.push(data[i]);
                console.log('no seleccionable');
              }
            })
          });
        
        }});
      loading.dismiss();
    });
        this.sql.getCabecillas().then((data: trabajadores[]) => {this.list = data; this.cabecillas = data; console.log(this.cabecillas)});
        
      
      
  }

  ionViewDidLoad() {
  }

  filterPersonas(){
    if(this.personasFilter === 'cabecillas'){
      this.list = this.cabecillas;
      this.filter = true;
    } else {
      for(let i = 0; i < this.noAsignados.length; i++){
        this.sql.getPuestosById(this.noAsignados[i].puesto_id).then((res: puestos) => {return res})
        .then((res) => {
          this.listNoAsi[i].id = this.noAsignados[i].id;
          this.listNoAsi[i].nombre = this.noAsignados[i].nombre;
          this.listNoAsi[i].puesto = res.nombre;
        })
      }
      this.list = this.noAsignados;
      this.filter = false;
    };
  }

  itemTapped($event, cuad){
    if(this.personasFilter === 'noAsignados'){
      if(this.finalList.indexOf(cuad.id) === -1){
        this.finalList.push(cuad.id);
        cuad.selected = true;
        this.noAsi = true;
      } 
      else {
          this.finalList.splice(this.finalList.indexOf(cuad.id), 1);
          cuad.selected = false;
          console.log(this.finalList.length);
          if(this.finalList.length < 2 ){
            this.noAsi = false;
          }
      }
    } else {
      this.navCtrl.push(ListCuadrillasPage, [cuad, this.datos]);
    }
    
  }
  confirmarTraslado(){
    
      this.navCtrl.push(ConfirmarTrasladoPage, [this.finalList, this.datos]);
    
    
  }

}
