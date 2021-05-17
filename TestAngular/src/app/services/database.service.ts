import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Empleado } from '../models/empleado.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  empleados:any[]=[];

  constructor(private firestore: AngularFirestore) { }

  public guardarEmpleado(empleado: Empleado, documentId?: string) {
    if(documentId){
      console.log("actualizar");
      return this.firestore.collection('empleado').doc(documentId).set(Object.assign({}, empleado));
    }
    else{
      console.log("guardar");
      return this.firestore.collection('empleado').add(Object.assign({}, empleado));
    }
    
  }

  public obtenerEmpleado(documentId: string) {
    return this.firestore.collection<Empleado>('empleado').doc(documentId).valueChanges();
  }
  //Obtiene todos los gatos
  public listarEmpleados() {
    return this.firestore.collection('empleado').snapshotChanges()
    .pipe(map((datap:any) => {
      return datap.map(change => {
        const data = change.payload.doc.data();
        console.log("data", data);
        const Id = change.payload.doc.id;
        return { Id, ...data };
      });
    }));
  }

  public listarAreas() {
    return this.firestore.collection('area').snapshotChanges()
    .pipe(map((datap:any) => {
      return datap.map(change => {
        const data = change.payload.doc.data();
        console.log("data", data);
        const Id = change.payload.doc.id;
        return { Id, ...data };
      });
    }));
  }

  public listarCargos(cod) {

    return this.firestore.collection('Cargo', ref=> ref.where("CodArea","==",cod)).snapshotChanges()
    .pipe(map((datap:any) => {
      return datap.map(change => {
        const data = change.payload.doc.data();
        console.log("data", data);
        const Id = change.payload.doc.id;
        return { Id, ...data };
      });
    }));
  }

  eliminar(codEmpleado) {
    return this.firestore
      .collection("empleado")
      .doc(codEmpleado)
      .delete();
  }

}
