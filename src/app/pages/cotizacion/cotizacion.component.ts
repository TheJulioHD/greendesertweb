import { cotizacionModel } from './../../models/cotizacion.model';
import { AlmacenserviceService } from 'src/app/services/almacenservice.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CotizacionserviceService } from 'src/app/services/cotizacionservice.service';
import Swal from 'sweetalert2';
import { convertToParamMap } from '@angular/router';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { EmpleadoserviceService } from 'src/app/services/empleadoservice.service';
import { empleadoModel } from 'src/app/models/empleados/empleados.models';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
  ltsCotizacion: FormGroup;
  ltsCotizaciones: any[]= [];
  ltsalmacen: any[]= [];
  Cotizacion = new cotizacionModel()
  submited=false;
  id!: string | null;
  rol!: 'operador'| 'contador' | 'admin';
  constructor(private CotizarService : CotizacionserviceService,
              private fb: FormBuilder,
              private almacen: AlmacenserviceService,
              private auth: LoginserviceService,
              private empleados: EmpleadoserviceService,
              ) { 
        this.ltsCotizacion = this.createForm();
    this.CotizarService.getall().subscribe(data =>{
      this.ltsCotizaciones = [];
      data.forEach((element: any) => {
        this.ltsCotizaciones.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
    this.almacen.getall().subscribe(data =>{
      this.ltsalmacen = [];
      data.forEach((element: any) => {
        this.ltsalmacen.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
    this.auth.state().subscribe((res)=>{
      if(res){
        console.log('logiado')
        this.getdatosEmpleados(res.uid)
      }else{
        console.log('sin login')
      }
    })
  }

createForm(){
  return new FormGroup({

    email: new FormControl('',   [Validators.required, Validators.minLength(5), Validators.email]),
    Nombres:new FormControl('', [Validators.required, Validators.minLength(3)]),
    Apellidos:new FormControl('', [Validators.required, Validators.minLength(3)]),
    Direccion:new FormControl('', [Validators.required, Validators.minLength(20)]),
    Telefono:new FormControl('',  [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern(/^[1-9]\d{6,10}$/)]),
    MontoMax: new FormControl('', [Validators.required,Validators.minLength(2), ]),
    MontoMin:new FormControl ('', [Validators.required,Validators.minLength(2), ]),
    Material:new FormControl ('', [Validators.required])
  })
}

onResetForm(){
  this.ltsCotizacion.reset();
}
get email() { return this.ltsCotizacion.get('email'); }
get Nombres() { return this.ltsCotizacion.get('Nombres'); }
get Apellidos() { return this.ltsCotizacion.get('Apellidos'); }
get Direccion() { return this.ltsCotizacion.get('Direccion'); }
get Telefono() { return this.ltsCotizacion.get('Telefono'); }
get MontoMax() { return this.ltsCotizacion.get('MontoMax'); }
get MontoMin() { return this.ltsCotizacion.get('MontoMin'); }
get Material() { return this.ltsCotizacion.get('Material'); }
  show = false

  ngOnInit(): void {
  }

  agregarCotiza(){
    
    const Cotizas: any={
      email: this.Cotizacion.Email,
      Nombres: this.Cotizacion.nombre,
      Apellidos: this.Cotizacion.apellidos,
      Direccion: this.Cotizacion.direccion,
      Telefono: this.Cotizacion.telefono,
      MontoMax: this.Cotizacion.montomax,
      MontoMin: this.Cotizacion.montomin,
      Material: JSON.stringify(this.Cotizacion.uidalmacen)
      
    }
    if(this.ltsCotizacion.valid){
      this.CotizarService.agregarCotizacion(Cotizas).then(()=>{
          this.onResetForm();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cotiza registrada',
            showConfirmButton: false,
            timer: 1500
          })
      }).catch(error =>{
        console.log(error)
      })
    }else[
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Datos Incorectos',
        footer: 'ingrese los datos correctos'
      })
    ]
    
  }

  editarCotiza(id:string){
    const Cotizas: any={
      email: this.ltsCotizacion.value.email,
      Nombres: this.ltsCotizacion.value.Nombres,
      Apellidos: this.ltsCotizacion.value.Apellidos,
      Direccion: this.ltsCotizacion.value.Direccion,
      Telefono: this.ltsCotizacion.value.Telefono,
      MontoMax: this.ltsCotizacion.value.MontoMax,
      MontoMin: this.ltsCotizacion.value.MontoMin,
      Material:  this.ltsCotizacion.value.Material
    }
    if(this.ltsCotizacion.valid){
      this.CotizarService.updateCotizacion(id, Cotizas).then(() =>{
        
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cotiza Actulizada',
            showConfirmButton: false,
            timer: 1500
          })
        
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Datos Incorectos',
        footer: 'Ingrese los datos correctos'
      })
    }
  }

  esEditar(id:string){
    this.id=id;
    this.CotizarService.getCotizacion(id).subscribe(data =>{
      console.log(data.payload.data()['Nombres']);
      this.ltsCotizacion.setValue({
        email: data.payload.data()['email'],
        Nombres: data.payload.data()['Nombres'],
        Apellidos: data.payload.data()['Apellidos'],
        Direccion: data.payload.data()['Direccion'],
        Telefono: data.payload.data()['Teléfono'],
        MontoMax: data.payload.data()['Monto Máximo'],
        MontoMin: data.payload.data()['Monto Mínimo'],
        Material: data.payload.data()['Material']
      })
    })
  }

  agregareditarCotiza(){
    this.submited= true;
    if(this.ltsCotizacion.invalid){
      return;
    }
    if(this.id== null){
      console.log('Error al actulizar')
    }else{
      this.editarCotiza(this.id)
    }
    
  }

  EliminarCotiza(id:string){
    Swal.fire({
      title: 'Advertencia',
      text: "Una vez hecho esto, no será posible revertirlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado',
          'La cotiza ha sido eliminada con éxito',
          'success'
        )
        this.CotizarService.eliminarCotizacion(id).then(()=>{
      
        })
      }
    })
    
  }
  /*
  onSubmit(){
    this.show = true;
  }
  */

  getdatosEmpleados(uid:string){
    this.empleados.getEmpleado<empleadoModel>(uid).subscribe(res=>{
      if(res){
        this.rol =res.Cargo
        console.log(res.Cargo) 
      }
    })
  }
}
