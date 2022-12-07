import { LoginserviceService } from './../../services/loginservice.service';
import { empleadoModel } from './../../models/empleados/empleados.models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { empty } from 'rxjs';
import { EmpleadoserviceService } from 'src/app/services/empleadoservice.service';
import Swal from 'sweetalert2';
import {Img, PdfMakeWrapper, Table} from 'pdfmake-wrapper';
import {ITable} from 'pdfmake-wrapper/lib/interfaces';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { stringLength } from '@firebase/util';
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
              private fb: FormBuilder,
              private register: LoginserviceService)
              {
                this.ltsempleado = this.fb.group({
                  Nombre:['',    [Validators.required, Validators.minLength(3)]],
                  Apellido:['',  [Validators.required, Validators.minLength(3)]],
                  Direccion:['', [Validators.required, Validators.minLength(20)]],
                  Cargo:['',     [Validators.required]],
                  Email:['',     [Validators.required, Validators.minLength(5), Validators.email]],
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
      Nombre: this.empleado.Nombre,
      Apellido: this.empleado.Apellido,
      Direccion: this.empleado.Direccion,
      Cargo: this.empleado.Cargo,
      Email: this.empleado.Email,
      Pass: this.empleado.Pass,
      uid: String,
    }
    if(this.ltsempleado.valid){
      // this.register.registerUser(empleados.Email, empleados.Pass).then((res)=>{
      //   if(res){
      //     empleados.uid = res.user.uid
      //     this.empleadoserivise.getall().subscribe(data =>{
      //       if(data.Email){}
      //     })
      //     this.empleadoserivise.agregarEmpleado(empleados).then(()=>{
       
      //       this.onResetForm()
      //       Swal.fire({
      //         position: 'top-end',
      //         icon: 'success',
      //         title: 'Empleado Registrado',
      //         showConfirmButton: false,
      //         timer: 1500
      //       })
          
          
      //   }).catch(error =>{
      //     console.log(error)
      //   })
      //   }
      //   console.log('empleado registrado')
      // }).catch((error) => console.log(error))
      console.log(this.ltsEmpleados)
      if(this.ltsEmpleados.find((user) => user.Email === empleados.Email)){
        console.log('error')
      }else{
        this.register.registerUser(empleados.Email, empleados.Pass).then((res)=>{
            if(res){
              empleados.uid = res.user.uid
              this.empleadoserivise.getall().subscribe(data =>{
                if(data.Email){}
              })
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
            }
            console.log('empleado registrado')
          }).catch((error) => console.log(error))
      }
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
    this.empleadoserivise.getEmpleado<empleadoModel>(id).subscribe(data =>{
      console.log(data.Nombre);
      this.ltsempleado.setValue({
        Nombre: data.Nombre,
      Apellido: data.Apellido,
      Direccion: data.Direccion,
      Cargo: data.Cargo,
      Email: data.Email,
      Pass: data.Pass,
    
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
      uid: id
    }
    if(this.ltsempleado.valid){
    this.empleadoserivise.getEmpleado<empleadoModel>(id).subscribe(data =>{
      if(data.Email ===empleados.Email && data.uid ===empleados.uid){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario duplicado',
          footer: 'ingrese los datos corectos'
        })
      }else{
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
      }
      
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
      title: '¿Estas seguro?',
      text: "Una vez selecionado ya no se puede revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si deseo elimarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire(
          'Eliminado!',
          'Tu archivo a sido eliminado.',
          'success'
        )
        this.empleadoserivise.eliminarEmpledo(id).then(()=>{
      
        })
      }
    })
    
  }




}
