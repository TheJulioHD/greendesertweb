import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionserviceService {

  constructor(private db: AngularFirestore) { 
  }
  getall(): Observable<any>{
    return this.db.collection('cotizaciones').snapshotChanges()
  }

  agregarCotizacion(Cotizacion: any):Promise<any>{
   return this.db.collection('cotizaciones').add(Cotizacion);
  }
  getCotizacion(id:string):Observable<any>{
   return this.db.collection('cotizaciones').doc(id).snapshotChanges()
  }
  updateCotizacion(id:string, data:any):Promise<any>{
   return this.db.collection('cotizaciones').doc(id).update(data)
  }
  eliminarCotizacion(id:string):Promise<any>{
   return this.db.collection('cotizaciones').doc(id).delete()
  }
}
