import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorserviceService {

  constructor(private db: AngularFirestore) {
    
  }


  getall(): Observable<any>{
     return this.db.collection('proveedores').snapshotChanges()
   }

   agregarproveedor(proveedor: any):Promise<any>{
    return this.db.collection('proveedores').add(proveedor);
   }
   getproveedor(id:string):Observable<any>{
    return this.db.collection('proveedores').doc(id).snapshotChanges()
   }
   updateproveedor(id:string, data:any):Promise<any>{
    return this.db.collection('proveedores').doc(id).update(data)
   }
   eliminarEmpledo(id:string):Promise<any>{
    return this.db.collection('proveedores').doc(id).delete()
   }
}
