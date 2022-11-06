import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesserviceService } from 'src/app/services/clientesservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  ltsCliente: FormGroup;
  ltsClientes: any[]= []
  submited=false;
  id!: string | null;
  constructor(private clienteService: ClientesserviceService,
              private fb: FormBuilder) {
        this.ltsCliente = this.fb.group({
        Nombre:['',     [Validators.required, Validators.minLength(3) ]],
        Apellido:['',   [Validators.required, Validators.minLength(3) ]],
        Direccion:['',  [Validators.required, Validators.minLength(20) ]],
        Email:['',      [Validators.required, Validators.minLength(5) ]],
      })
      this.clienteService.getall().subscribe(data =>{
        this.ltsClientes = [];
        data.forEach((element: any) => {
          this.ltsClientes.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
      })
     }

  ngOnInit(): void {
  }
  onResetForm(){
    this.ltsCliente.reset();
  }
  agregareditarCliente(){
    this.submited= true;
    if(this.ltsCliente.invalid){
      return;
    }
    if(this.id== null){
      console.log('no se pudo actulizar')
    }else{
      this.editarCliente(this.id)
    }
    
  }
  agregarCliente(){
    const Clientes: any={
      Nombre: this.ltsCliente.value.Nombre,
      Apellido: this.ltsCliente.value.Apellido,
      Direccion: this.ltsCliente.value.Direccion,
      Email: this.ltsCliente.value.Email,
      
    }
    if(this.ltsCliente.valid){
      this.clienteService.agregarCliente(Clientes).then(()=>{
        this.onResetForm();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente Registrado',
            showConfirmButton: false,
            timer: 1500
          })
        
        
      }).catch(error =>{
        console.log(error)
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

  esEditar(id:string){
    this.id=id;
    this.clienteService.getCliente(id).subscribe(data =>{
      console.log(data.payload.data()['Nombre']);
      this.ltsCliente.setValue({
        Nombre: data.payload.data()['Nombre'],
      Apellido: data.payload.data()['Apellido'],
      Direccion: data.payload.data()['Direccion'],
      Email: data.payload.data()['Email'],
      
    
      })
    })
  }

  editarCliente(id:string){
    const Clientes: any={
      Nombre: this.ltsCliente.value.Nombre,
      Apellido: this.ltsCliente.value.Apellido,
      Direccion: this.ltsCliente.value.Direccion,
      Email: this.ltsCliente.value.Email,
    }
    if(this.ltsCliente.valid){
      this.clienteService.updateCliente(id, Clientes).then(() =>{
        this.onResetForm()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente Actulizado',
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

  EliminarCliente(id:string){
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
        this.clienteService.eliminarEmpledo(id).then(()=>{
      
        })
      }
    })
    
  }

}
