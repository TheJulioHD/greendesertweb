import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CotizacionserviceService } from 'src/app/services/cotizacionservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
  ltsCotizacion: FormGroup;
  ltsCotizaciones: any[]= []
  submited=false;
  id!: string | null;
  constructor(private CotizarService : CotizacionserviceService,
    private fb: FormBuilder) { 
        this.ltsCotizacion = this.fb.group({
          email:['', Validators.required],
          Nombres:['', Validators.required],
        Apellidos:['', Validators.required],
        Direccion:['', Validators.required],
        Telefono:['', Validators.required],
        MontoMax: ['', Validators.required],
        MontoMin: ['', Validators.required],
        Material: ['', Validators.required]
    })
    this.CotizarService.getall().subscribe(data =>{
      this.ltsCotizaciones = [];
      data.forEach((element: any) => {
        this.ltsCotizaciones.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  

  show = false

  ngOnInit(): void {
  }

  agregarCotiza(){
    const Cotizas: any={
      email: this.ltsCotizacion.value.email,
      Nombres: this.ltsCotizacion.value.Nombres,
      Apellidos: this.ltsCotizacion.value.Apellidos,
      Direccion: this.ltsCotizacion.value.Direccion,
      Telefono: this.ltsCotizacion.value.Telefono,
      MontoMax: this.ltsCotizacion.value.MontoMax,
      MontoMin: this.ltsCotizacion.value.MontoMin,
      Material: this.ltsCotizacion.value.Material
      
    }
    this.CotizarService.agregarCotizacion(Cotizas).then(()=>{
      if(Cotizas==null){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Datos Incorectos',
            footer: 'ingrese los datos correctos'
          })
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cotiza registrada',
          showConfirmButton: false,
          timer: 1500
        })
      }
      
    }).catch(error =>{
      console.log(error)
    })
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
      Material: this.ltsCotizacion.value.Material
    }
    this.CotizarService.updateCotizacion(id, Cotizas).then(() =>{
      if(Cotizas ==null){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Datos Incorectos',
          footer: 'Ingrese los datos correctos'
        })
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cotiza Actulizada',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
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
    this.CotizarService.eliminarCotizacion(id).then(()=>{
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
        }
      })
    })
  }
  /*
  onSubmit(){
    this.show = true;
  }
  */
}
