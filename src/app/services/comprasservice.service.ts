import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprasserviceService {

  constructor(private db: AngularFirestore) {
    
  }


  getall(): Observable<any>{
     return this.db.collection('compras').snapshotChanges()
   }

   agregarcompras(compras: any):Promise<any>{
    return this.db.collection('compras').add(compras);
   }
   getcompras(id:string):Observable<any>{
    return this.db.collection('compras').doc(id).snapshotChanges()
   }
   updatecompras(id:string, data:any):Promise<any>{
    return this.db.collection('compras').doc(id).update(data)
   }
   eliminarcompras(id:string):Promise<any>{
    return this.db.collection('compras').doc(id).delete()
   }
}
