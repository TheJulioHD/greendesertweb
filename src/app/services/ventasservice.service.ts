import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasserviceService {

  constructor(private db: AngularFirestore) {
    
  }


  getall(): Observable<any>{
     return this.db.collection('ventas').snapshotChanges()
   }

   agregarventas(ventas: any):Promise<any>{
    return this.db.collection('ventas').add(ventas);
   }
   getventas(id:string):Observable<any>{
    return this.db.collection('ventas').doc(id).snapshotChanges()
   }
   updateventas(id:string, data:any):Promise<any>{
    return this.db.collection('ventas').doc(id).update(data)
   }
   eliminarventas(id:string):Promise<any>{
    return this.db.collection('ventas').doc(id).delete()
   }
}
