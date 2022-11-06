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
                  Proveedor:['',  [Validators.required, Validators.minLength(3)]],
                  Material:['',   [Validators.required, Validators.minLength(3)]],
                  coddigo:['',    [Validators.required, Validators.minLength(4)]],
                  unidad:['',     [Validators.required, Validators.minLength(1),Validators.pattern(/^[1-9]\d{6,10}$/)]],
                  cantidad:['',   [Validators.required, Validators.minLength(1),Validators.pattern(/^[1-9]\d{6,10}$/)]],
                  preciouni:['',  [Validators.required, Validators.minLength(1),Validators.pattern(/^[1-9]\d{6,10}$/)]],
                  descipcion:['', [Validators.required, Validators.minLength(10) ]],
                  descuento:['',  [Validators.required, Validators.minLength(1), Validators.pattern(/^[1-9]\d{6,10}$/)]],
                  iva:['',        [Validators.required, Validators.minLength(1),Validators.pattern(/^[1-9]\d{6,10}$/)]],
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
  onResetForm(){
    this.compras.reset()
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
    const compra: any={

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
    if(this.compras.valid){
      this.comprasService.agregarcompras(compra).then(()=>{
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
   if(this.compras.valid){
    this.proveedoresservice.updateproveedor(id, compras).then(() =>{
      
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

  eliminarCompra(id:string){
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
        this.comprasService.eliminarcompras(id).then(()=>{
      
        })
      }
    })
    
  }
}
