import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlmacenserviceService } from 'src/app/services/almacenservice.service';
import { ProveedorserviceService } from 'src/app/services/proveedorservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit {
  ltsalmacen: FormGroup;
  ltsalmacenes: any[]= []
  ltsproveedores: any[]= []
  submited=false;
  id!: string | null;
  constructor(private almacenSerice: AlmacenserviceService,
               private fb: FormBuilder,
               private provedoresservice: ProveedorserviceService) { 
                this.ltsalmacen = this.fb.group({
                  Proveedor:['', Validators.required],
                  Material:['', Validators.required],
                  coddigo:['', Validators.required],
                  cantidad:['', Validators.required],
                  estatus:['', Validators.required],
                  observaciones:['', Validators.required],
                })
                this.provedoresservice.getall().subscribe( data =>{
                  this.ltsproveedores=[]
                  data.forEach((element : any) => {
                    this.ltsproveedores.push({
                      id: element.payload.doc.id,
                      ...element.payload.doc.data()
                    })
                  });
                })
                this.almacenSerice.getall().subscribe( data =>{
                  this.ltsalmacenes=[]
                  data.forEach((element : any) => {
                    this.ltsalmacenes.push({
                      id: element.payload.doc.id,
                      ...element.payload.doc.data()
                    })
                  });
                })
               }

  ngOnInit(): void {
  }
  agregareditaralmacen(){
    this.submited= true;
    if(this.ltsalmacen.invalid){
      return;
    }
    if(this.id== null){
      console.log('no se pudo actulizar')
    }else{
      this.editaralmacen(this.id)
    }
    
  }
  esEditar(id:string){
    this.id=id;
    this.almacenSerice.getalmacen(id).subscribe(data =>{
      console.log(data.payload.data()['Nombre']);
      this.ltsalmacen.setValue({
        Proveedor: data.payload.data()['Proveedor'],
        Material: data.payload.data()['Material'],
        coddigo: data.payload.data()['coddigo'],
        cantidad: data.payload.data()['cantidad'],
        estatus: data.payload.data()['estatus'],
        observaciones: data.payload.data()['observaciones'],
    
      })
    })
  }
  agregaralmacen(){
    const almacen: any={
      Proveedor:this.ltsalmacen.value.Proveedor,
      Material:this.ltsalmacen.value.Material,
      coddigo:this.ltsalmacen.value.coddigo,
      cantidad:this.ltsalmacen.value.cantidad,
      estatus:this.ltsalmacen.value.estatus,
      observaciones:this.ltsalmacen.value.observaciones,
    }
    this.almacenSerice.agregaralmacen(almacen).then(()=>{
      if(almacen==null){
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
        }).catch(error =>{
          console.log(error)
        })
      }
      
    })
  }

  editaralmacen(id:string){
    const almacen: any={
      Proveedor:this.ltsalmacen.value.Proveedor,
      Material:this.ltsalmacen.value.Material,
      coddigo:this.ltsalmacen.value.coddigo,
      cantidad:this.ltsalmacen.value.cantidad,
      estatus:this.ltsalmacen.value.estatus,
      observaciones:this.ltsalmacen.value.observaciones,
    }
    this.almacenSerice.updatealmacen(id, almacen).then(() =>{
      if(almacen ==null){
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

  Eliminaralmacen(id:string){
    this.almacenSerice.eliminaralmacen(id).then(()=>{
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
