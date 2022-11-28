import { empleadoModel } from './../models/empleados/empleados.models';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
  
})
export class EmpleadoserviceService {
  
  constructor(private db: AngularFirestore) {
    
  }
  //'empleados' es la coleccion a la cual vamos a hacer para la base de datos, cambiar la coleccion por el apartado que toca por ejemplo si es cliete la coleccion va a ser clientes

  getall(): Observable<any>{
     return this.db.collection('empleados').snapshotChanges()
   }

   agregarEmpleado(empleado: any):Promise<any>{
    return this.db.collection('empleados').doc(empleado.uid).set(empleado)
   }
   getEmpleado<empleadoModel>(id:string):Observable<any>{
    return this.db.collection('empleados').doc<empleadoModel>(id).valueChanges()
   }
   updateEmpleado(id:string, data:any):Promise<any>{
    return this.db.collection('empleados').doc(id).update(data)
   }
   eliminarEmpledo(id:string):Promise<any>{
    return this.db.collection('empleados').doc(id).delete()
   }
}
