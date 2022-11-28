import { proveedoresModel } from './../../../models/invenentarios/proveedores/proveedores.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorserviceService } from 'src/app/services/proveedorservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  ltsproveedor: FormGroup;
  ltsproveedores: any[]= []
  proveedores= new proveedoresModel()
  submited=false;
  id!: string | null;
  constructor(private proveedoresservice: ProveedorserviceService,
              private fb: FormBuilder) {
                this.ltsproveedor = this.fb.group({
                  Codigo:['', Validators.required],
                  Nombre:['', Validators.required],
                  Direccion:['', Validators.required],
                  Email:['', Validators.required],
                  telefono:['', Validators.required],
                  status:['', Validators.required],
                })
                this.proveedoresservice.getall().subscribe( data =>{
                  this.ltsproveedores=[]
                  data.forEach((element : any) => {
                    this.ltsproveedores.push({
                      id: element.payload.doc.id,
                      ...element.payload.doc.data()
                    })
                  });
                })
               }
  
  ngOnInit(): void {
  }
  onResetForm(){
    this.ltsproveedor.reset()
  }
  agregareditarproveedor(){
    this.submited= true;
    if(this.ltsproveedor.invalid){
      return;
    }
    if(this.id== null){
      console.log('no se pudo actulizar')
    }else{
      this.editarProveedor(this.id)
    }
    
  }
  esEditar(id:string){
    this.id=id;
    this.proveedoresservice.getproveedor(id).subscribe(data =>{
      console.log(data.payload.data()['Nombre']);
      this.ltsproveedor.setValue({
        Codigo: data.payload.data()['Codigo'],
        Nombre: data.payload.data()['Nombre'],
        Direccion: data.payload.data()['Direccion'],
        Email: data.payload.data()['Email'],
        telefono: data.payload.data()['telefono'],
      status: data.payload.data()['status'],
    
      })
    })
  }
  agregarProveedor(){
    const proveedor: any={
      Codigo:this.proveedores.Codigo,
      Nombre:this.proveedores.Nombre,
      Direccion:this.proveedores.Direccion,
      Email:this.proveedores.Email,
      telefono:this.proveedores.telefono,
      status:this.proveedores.status,
    }
    if(this.ltsproveedor.valid){
      this.proveedoresservice.agregarproveedor(proveedor).then(()=>{
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

  editarProveedor(id:string){
    const proveedor: any={
      Codigo:this.ltsproveedor.value.Codigo,
      Nombre:this.ltsproveedor.value.Nombre,
      Direccion:this.ltsproveedor.value.Direccion,
      Email:this.ltsproveedor.value.Email,
      telefono:this.ltsproveedor.value.telefono,
      status:this.ltsproveedor.value.status,
    }
    if(this.ltsproveedor.valid){
      this.proveedoresservice.updateproveedor(id, proveedor).then(() =>{
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

  EliminarProveedor(id:string){
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
        this.proveedoresservice.eliminarEmpledo(id).then(()=>{
      
        })
      }
    })
    
  }
  onSumit(){
    console.log("hola")
  }
}
