import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { almacenmodel } from 'src/app/models/invenentarios/almacen.model';
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
  almacen= new almacenmodel()//proti
  submited=false;
  id!: string | null;
  constructor(private almacenSerice: AlmacenserviceService,
               private fb: FormBuilder,
               private provedoresservice: ProveedorserviceService) { 
                this.ltsalmacen = this.fb.group({
                  Proveedor:['',      [Validators.required]],
                  Material:['',       [Validators.required, Validators.minLength(3)]],
                  coddigo:['',        [Validators.required, Validators.minLength(4)]],
                  cantidad:['',       [Validators.required, Validators.minLength(1)]],
                  estatus:['',        [Validators.required, Validators.minLength(5)]],
                  observaciones:['',  [Validators.required, Validators.minLength(10)]],
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
  onResetForm(){
    this.ltsalmacen.reset()
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
      Proveedor:this.almacen.provedor,
      Material:this.almacen.material,
      coddigo:this.almacen.codigo,
      cantidad:this.almacen.cantida,
      estatus:this.almacen.estatus,
      observaciones:this.almacen.observaciones,
    }

    console.log(this.ltsproveedores)
    if(this.ltsalmacen.valid){
      this.almacenSerice.agregaralmacen(almacen).then(()=>{
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

  editaralmacen(id:string){
    const almacen: any={
      Proveedor:this.ltsalmacen.value.Proveedor,
      Material:this.ltsalmacen.value.Material,
      coddigo:this.ltsalmacen.value.coddigo,
      cantidad:this.ltsalmacen.value.cantidad,
      estatus:this.ltsalmacen.value.estatus,
      observaciones:this.ltsalmacen.value.observaciones,
    }
    if(this.ltsalmacen.valid){
      this.almacenSerice.updatealmacen(id, almacen).then(() =>{
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

  Eliminaralmacen(id:string){
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
        this.almacenSerice.eliminaralmacen(id).then(()=>{
     
        })
      }
    })
    
  }

}
