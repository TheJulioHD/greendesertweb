import { empleadoModel } from './../../models/empleados/empleados.models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { empty } from 'rxjs';
import { EmpleadoserviceService } from 'src/app/services/empleadoservice.service';
import Swal from 'sweetalert2';
import {PdfMakeWrapper, Table} from 'pdfmake-wrapper';
import {ITable} from 'pdfmake-wrapper/lib/interfaces';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
PdfMakeWrapper.setFonts(pdfFonts);
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  ltsempleado: FormGroup;
ltsEmpleados: any[]= []
empleado= new empleadoModel()
submited=false;
id!: string | null;
  constructor(private empleadoserivise: EmpleadoserviceService,
              private fb: FormBuilder)
              {
                this.ltsempleado = this.fb.group({
                  Nombre:['',    [Validators.required, Validators.minLength(3)]],
                  Apellido:['',  [Validators.required, Validators.minLength(3)]],
                  Direccion:['', [Validators.required, Validators.minLength(20)]],
                  Cargo:['',     [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
                  Email:['',     [Validators.required, Validators.minLength(5)]],
                  Pass:['',      [Validators.required, Validators.minLength(8)]],
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

  generatePDF(){
    const pdf = new PdfMakeWrapper();
    pdf.add(this.createtable(this.ltsEmpleados))

    pdf.create().open()
  
    
  }
  createtable(data: any): ITable{
      [{}]
      return new Table([
        ['Nombre','Apellido','Direccion','Cargo','Email'],
        ...this.extractData(data)
      ]).layout('lightHorizontalLines')
      .end
  }

  extractData(data: any){
   return data.map((row:any) =>[row.Nombre, row.Apellido,row.Direccion, row.Cargo,row.Email])
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

  onResetForm(){
    this.ltsempleado.reset();
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
    if(this.ltsempleado.valid){
      this.empleadoserivise.agregarEmpleado(empleados).then(()=>{
          this.onResetForm()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Empleado Registrado',
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
        footer: 'ingrese los datos corectos'
      })
    ]
    
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
    if(this.ltsempleado.valid){
      this.empleadoserivise.updateEmpleado(id, empleados).then(() =>{
        this.onResetForm();
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

  EliminarEmpleado(id:string){
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
        this.empleadoserivise.eliminarEmpledo(id).then(()=>{
      
        })
      }
    })
    
  }




}
