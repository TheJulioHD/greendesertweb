import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ventasmodel } from 'src/app/models/invenentarios/ventas.model';
import { VentasserviceService } from 'src/app/services/ventasservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ltsventa: FormGroup;
  ltsventas: any[]= []
  venta= new ventasmodel()
  submited=false;
  id!: string | null;
  constructor(private ventasservice: VentasserviceService,
               private fb: FormBuilder) { 
                this.ltsventa = this.fb.group({
                  Cliente:['',        [Validators.required, Validators.minLength(3)]],
                  Direccion:['',      [Validators.required, Validators.minLength(3)]],
                  materiales:['',     [Validators.required, Validators.minLength(3)]],
                  estado:['',         [Validators.required, Validators.minLength(3)]],
                  telefono:['',       [Validators.required, Validators.minLength(3)]],
                  observaciones:['',  [Validators.required, Validators.minLength(3)]],
                })
                this.ventasservice.getall().subscribe( data =>{
                  this.ltsventas=[]
                  data.forEach((element : any) => {
                    this.ltsventas.push({
                      id: element.payload.doc.id,
                      ...element.payload.doc.data()
                    })
                  });
                })
               }
  
  ngOnInit(): void {
  }
  onResetForm(){
    this.ltsventa.reset()
  }
  agregareditarventas(){
    this.submited= true;
    if(this.ltsventa.invalid){
      return;
    }
    if(this.id== null){
      console.log('no se pudo actulizar')
    }else{
      this.editarventas(this.id)
    }
    
  }
  esEditar(id:string){
    this.id=id;
    this.ventasservice.getventas(id).subscribe(data =>{
      console.log(data.payload.data()['Nombre']);
      this.ltsventa.setValue({
        Cliente: data.payload.data()['Cliente'],
        Direccion: data.payload.data()['Direccion'],
        materiales: data.payload.data()['materiales'],
        estado: data.payload.data()['estado'],
        telefono: data.payload.data()['telefono'],
        observaciones: data.payload.data()['observaciones'],
    
      })
    })
  }
  agregarventas(){
    const ventas: any={
      Cliente:this.venta.Cliente,
      Direccion:this.venta.Direccion,
      materiales:this.venta.materiales,
      estado:this.venta.estado,
      telefono:this.venta.telefono,
      observaciones:this.venta.observaciones,
    }
    if(this.ltsventa.valid){
      this.ventasservice.agregarventas(ventas).then(()=>{
        this.onResetForm()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Empleado Registrado',
            showConfirmButton: false,
            timer: 1500
          }).catch(error =>{
            console.log(error)
          })
        
        
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Datos Incorectos',
        footer: 'ingrese los datos corectos'
      })
    }
  }

  editarventas(id:string){
    const ventas: any={
      Cliente:this.ltsventa.value.Cliente,
      Direccion:this.ltsventa.value.Direccion,
      materiales:this.ltsventa.value.materiales,
      estado:this.ltsventa.value.estado,
      telefono:this.ltsventa.value.telefono,
      observaciones:this.ltsventa.value.observaciones,
    }
    if(this.ltsventa.valid){
      this.ventasservice.updateventas(id, ventas).then(() =>{
        this.onResetForm()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Empleado Actulizado',
            showConfirmButton: false,
            timer: 1500
          })
        
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Datos Incorectos',
        footer: 'ingrese los datos corectos'
      })
    }

  }

  Eliminarventas(id:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.ventasservice.eliminarventas(id).then(()=>{
      
        })
      }
    })
    
  }
}
