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
        Nombre:['', Validators.required],
        Apellido:['', Validators.required],
        Direccion:['', Validators.required],
        Email:['', Validators.required],
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
    this.clienteService.agregarCliente(Clientes).then(()=>{
      if(Clientes==null){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Datos Incorectos',
          footer: 'ingrese los datos corectos'
        })
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cliente Registrado',
          showConfirmButton: false,
          timer: 1500
        })
      }
      
    }).catch(error =>{
      console.log(error)
    })
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
    this.clienteService.updateCliente(id, Clientes).then(() =>{
      if(Clientes ==null){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Datos Incorectos',
          footer: 'ingrese los datos corectos'
        })
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cliente Actulizado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  EliminarCliente(id:string){
    this.clienteService.eliminarEmpledo(id).then(()=>{
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
        }
      })
    })
  }

}
