import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesserviceService {

  constructor(private db: AngularFirestore) { }
  getall(): Observable<any>{
    return this.db.collection('clientes').snapshotChanges()
  }

  agregarCliente(Cliente: any):Promise<any>{
   return this.db.collection('clientes').add(Cliente);
  }
  getCliente(id:string):Observable<any>{
   return this.db.collection('clientes').doc(id).snapshotChanges()
  }
  updateCliente(id:string, data:any):Promise<any>{
   return this.db.collection('clientes').doc(id).update(data)
  }
  eliminarEmpledo(id:string):Promise<any>{
   return this.db.collection('clientes').doc(id).delete()
  }
}
