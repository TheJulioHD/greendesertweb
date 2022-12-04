import { Component, OnInit } from '@angular/core';
import { empleadoModel } from 'src/app/models/empleados/empleados.models';
import { EmpleadoserviceService } from 'src/app/services/empleadoservice.service';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  rol!: 'operador'| 'contador' | 'admin';

  constructor(private auth: LoginserviceService,
              private empleados: EmpleadoserviceService) { 
    this.auth.state().subscribe((res)=>{
      if(res){
        console.log('logiado')
        this.getdatosEmpleados(res.uid)
      }else{
        console.log('sin login')
      }
    })
  }

  ngOnInit(): void {
  }
  getdatosEmpleados(uid:string){
    this.empleados.getEmpleado<empleadoModel>(uid).subscribe(res=>{
      if(res){
        this.rol =res.Cargo
        console.log(res.Cargo) 
      }
    })
  }

}
