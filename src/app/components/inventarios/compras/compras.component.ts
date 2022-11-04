import { proveedoresModel } from './../../../models/invenentarios/proveedores/proveedores.model';
import { Component, OnInit } from '@angular/core';
import { ProveedorserviceService } from 'src/app/services/proveedorservice.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ComprasserviceService } from 'src/app/services/comprasservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  ltscompras!:Array<any>
  ltsproveedores: any[]= []
  compras!: FormGroup
  submited=false;
  id!: string | null;
  constructor(private proveedoresservice: ProveedorserviceService,
              private fb: FormBuilder,
              private comprasService: ComprasserviceService) {
                this.compras = this.fb.group({
                  Proveedor:['', Validators.required],
                  Material:['', Validators.required],
                  coddigo:['', Validators.required],
                  unidad:['', Validators.required],
                  cantidad:['', Validators.required],
                  preciouni:['', Validators.required],
                  descipcion:['', Validators.required],
                  descuento:['', Validators.required],
                  iva:['', Validators.required],
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
                this.comprasService.getall().subscribe( data =>{
                  this.ltscompras=[]
                  data.forEach((element : any) => {
                    this.ltscompras.push({
                      id: element.payload.doc.id,
                      ...element.payload.doc.data()
                    })
                  });
                })
                
               }
  
  ngOnInit(): void {
  }

  agregareditarCompra(){
    this.submited= true;
    if(this.compras.invalid){
      return;
    }
    if(this.id== null){
      console.log('no se pudo actulizar')
    }else{
      this.editarCompra(this.id)
    }
    
  }
  esEditar(id:string){
    this.id=id;
    this.comprasService.getcompras(id).subscribe(data =>{
      console.log(data.payload.data()['Nombre']);
      this.compras.setValue({
        Proveedor: data.payload.data()['Proveedor'],
        Material: data.payload.data()['Material'],
        coddigo: data.payload.data()['coddigo'],
        cantidad: data.payload.data()['cantidad'],
        preciouni: data.payload.data()['preciouni'],
        unidad: data.payload.data()['unidad'],
        descipcion: data.payload.data()['descipcion'],
        descuento: data.payload.data()['descuento'],
        iva: data.payload.data()['iva'],
    
      })
    })
  }
  agregarCompra(){
    const compras: any={

      Proveedor:this.compras.value.Proveedor,
      Material:this.compras.value.Material,
      coddigo:this.compras.value.coddigo,
      cantidad:this.compras.value.cantidad,
      preciouni:this.compras.value.preciouni,
      descipcion:this.compras.value.descipcion,
      unidad:this.compras.value.unidad,
      descuento:this.compras.value.descuento,
      iva:this.compras.value.iva,
    }
    this.comprasService.agregarcompras(compras).then(()=>{
      if(compras==null){
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

  editarCompra(id:string){
    const compras: any={
      Proveedor:this.compras.value.Proveedor,
      Material:this.compras.value.Material,
      coddigo:this.compras.value.coddigo,
      cantidad:this.compras.value.cantidad,
      preciouni:this.compras.value.preciouni,
      descipcion:this.compras.value.descipcion,
      unidad:this.compras.value.unidad,
      descuento:this.compras.value.descuento,
      iva:this.compras.value.iva,
    }
    this.proveedoresservice.updateproveedor(id, compras).then(() =>{
      if(compras ==null){
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

  eliminarCompra(id:string){
    this.comprasService.eliminarcompras(id).then(()=>{
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
