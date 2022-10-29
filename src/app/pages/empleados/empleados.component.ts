import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { empty } from 'rxjs';
import { EmpleadoserviceService } from 'src/app/services/empleadoservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
ltsempleado: FormGroup;
ltsEmpleados: any[]= []
submited=false;
id!: string | null;
  constructor(private empleadoserivise: EmpleadoserviceService,
              private fb: FormBuilder)
              {
                this.ltsempleado = this.fb.group({
                  Nombre:['', Validators.required],
                  Apellido:['', Validators.required],
                  Direccion:['', Validators.required],
                  Cargo:['', Validators.required],
                  Email:['', Validators.required],
                  Pass:['', Validators.required],
                })
                this.empleadoserivise.getall().subscribe(data =>{
                  this.ltsEmpleados = [];
                  data.forEach((element: any) => {
                    this.ltsEmpleados.push({
                      id: element.payload.doc.id,
                      ...element.payload.doc.data()
                    })
                  });
                })
              }

  ngOnInit(): void {
  }
  agregareditarempleado(){
    this.submited= true;
    if(this.ltsempleado.invalid){
      return;
    }
    if(this.id== null){
      console.log('no se pudo actulizar')
    }else{
      this.editarEmpleado(this.id)
    }
    
  }
  agregarEmpleado(){
    const empleados: any={
      Nombre: this.ltsempleado.value.Nombre,
      Apellido: this.ltsempleado.value.Apellido,
      Direccion: this.ltsempleado.value.Direccion,
      Cargo: this.ltsempleado.value.Cargo,
      Email: this.ltsempleado.value.Email,
      Pass: this.ltsempleado.value.Pass,
    }
    this.empleadoserivise.agregarEmpleado(empleados).then(()=>{
      if(empleados==null){
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
          title: 'Empleado Registrado',
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
    this.empleadoserivise.getEmpleado(id).subscribe(data =>{
      console.log(data.payload.data()['Nombre']);
      this.ltsempleado.setValue({
        Nombre: data.payload.data()['Nombre'],
      Apellido: data.payload.data()['Apellido'],
      Direccion: data.payload.data()['Direccion'],
      Cargo: data.payload.data()['Cargo'],
      Email: data.payload.data()['Email'],
      Pass: data.payload.data()['Pass'],
    
      })
    })
  }

  editarEmpleado(id:string){
    const empleados: any={
      Nombre: this.ltsempleado.value.Nombre,
      Apellido: this.ltsempleado.value.Apellido,
      Direccion: this.ltsempleado.value.Direccion,
      Cargo: this.ltsempleado.value.Cargo,
      Email: this.ltsempleado.value.Email,
      Pass: this.ltsempleado.value.Pass,
    }
    this.empleadoserivise.updateEmpleado(id, empleados).then(() =>{
      if(empleados ==null){
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
          title: 'Empleado Actulizado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  EliminarEmpleado(id:string){
    this.empleadoserivise.eliminarEmpledo(id).then(()=>{
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
