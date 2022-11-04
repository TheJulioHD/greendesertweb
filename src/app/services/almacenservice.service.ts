import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlmacenserviceService {

  constructor(private db: AngularFirestore) {
    
  }


  getall(): Observable<any>{
     return this.db.collection('almacen').snapshotChanges()
   }

   agregaralmacen(almacen: any):Promise<any>{
    return this.db.collection('almacen').add(almacen);
   }
   getalmacen(id:string):Observable<any>{
    return this.db.collection('almacen').doc(id).snapshotChanges()
   }
   updatealmacen(id:string, data:any):Promise<any>{
    return this.db.collection('almacen').doc(id).update(data)
   }
   eliminaralmacen(id:string):Promise<any>{
    return this.db.collection('almacen').doc(id).delete()
   }
}
