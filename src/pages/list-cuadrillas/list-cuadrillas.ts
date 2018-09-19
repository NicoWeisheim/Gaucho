import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ConfirmarTrasladoPage } from '../confirmar-traslado/confirmar-traslado';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';

interface trabajadores {
  id: number,
  nombre: string,
  puesto_id: number,
  foto: string,
  qr: number,
  cuadrilla_id: number
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

interface campos{
  id: number,
  nombre_campo: string,
  numero_planta: number
}
interface datos {
  origen: string,
  supOri: string,
  fecha: string,
  destino: string,
  supDes: string
}


@Component({
  selector: 'page-list-cuadrillas',
  templateUrl: 'list-cuadrillas.html',
})
export class ListCuadrillasPage {

  cuadrillas: trabajadores[]= [{
    id: 0,
    nombre: '',
    puesto_id: 0,
    foto: '',
    qr: 0,
    cuadrilla_id: 0
  }];;
  integrantes: trabajadores[] = [{
    id: 0,
    nombre: '',
    puesto_id: 0,
    foto: '',
    qr: 0,
    cuadrilla_id: 0
  }];
  noSeleccionables: trabajadores[]= [{
    id: 0,
    nombre: '',
    puesto_id: 0,
    foto: '',
    qr: 0,
    cuadrilla_id: 0
  }];;
  supervisor: any[]= [{}];
  list: trabajadores[]= [{
    id: 0,
    nombre: '',
    puesto_id: 0,
    foto: '',
    qr: 0,
    cuadrilla_id: 0
  }];
  noAsignados:trabajadores[]= [{
    id: 0,
    nombre: '',
    puesto_id: 0,
    foto: '',
    qr: 0,
    cuadrilla_id: 0
  }];
  filter: boolean = true;
  finalList: any[] = [{}];
  datos: datos = {
    origen: '',
  supOri: '',
  fecha: '',
  destino: '',
  supDes: ''
  };
  personasFilter: string = 'cuadrilla';
  seleccionable: boolean = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingController: LoadingController,
    private sql: SqlStorageProvider,
    private alertCtrl: AlertController) {
      this.supervisor = this.navParams.data;
      this.noSeleccionables.pop();
      this.datos = this.supervisor[1];
    let loading = this.loadingController.create({
      content: 'Getting data...'
    });
    loading.present().then(() => {
      
      // this.sql.getTrabajadoresByCuadrilla(this.supervisor[0]).then((data: trabajadores[]) => 
      // {
      //   let j = 0;
      //   let h = 0;

      //   for(let i = 0; i< data.length; i++){
      //     this.sql.getGrupoTrasladosByTrabajador(data[i].id).then((res: grupo_traslado[]) => 
      //     {
      //       if(res[res.length -1].id === 0){
      //         this.integrantes[j] = data[i];
      //           j++;
      //       } else {
      //         this.sql.getTrasladosById(res[res.length -1].id_traslado).then((resp: traslados) => {
      //           if(resp.id_campo_destino === this.supervisor[1].origen){
                  
      //             this.integrantes[j] = data[i];
      //             j++;
                  
      //           } else {
                  
      //             this.noSeleccionables[h] = data[i];
      //             h++;
      //           }
      //         })
      //       }
      //     })
      //   }
      // this.list = this.integrantes;}
      //);
      this.integrantes.pop();
      this.noAsignados.pop();
      this.sql.getIntegrantesCuadrilla(this.supervisor[0]).then((data: trabajadores[]) => {return data})
      .then((data) => {
        console.log('t '+data);
        for(let i =0; i<data.length; i++){
          this.sql.getGrupoTrasladosByTrabajador(data[i].id).then((res: grupo_traslado[]) => {
            if(res[res.length-1].id != 0){
            return res;}
          else{
            this.integrantes.push(data[i]);
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
                this.integrantes.push(data[i]);
                console.log('integrante');
              }
              else {
                this.noSeleccionables.push(data[i]);
                console.log('no seleccionable');
              }
            })
          });
        
        }this.list = this.integrantes;});


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
  }

  ionViewDidLoad() {
    
    this.finalList.pop();
  }

  filterPersonas(){
    if(this.personasFilter === 'cuadrilla'){
      this.list = this.integrantes;
      this.filter = true;
    } else {
      this.list = this.noAsignados;
      this.filter = false;
    };
  }

  itemTapped($event, item){
    if(this.finalList.indexOf(item.id) === -1){
      this.finalList.push(item.id);
      item.selected = true;
    } 
    else {
        this.finalList.splice(this.finalList.indexOf(item.id), 1);
        item.selected = false;
    }
    
  }

  confirmarTraslado(){
    if(this.finalList.length === 0){
      this.presentAlert();
    }else {
      this.navCtrl.push(ConfirmarTrasladoPage, [this.finalList, this.datos]);
    }
    
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'No hay personal seleccionado',
      subTitle: 'Debe seleccionar al menos un integrante del personal para el traslado',
      buttons: ['Ok']
    });
    alert.present();
  }

}
