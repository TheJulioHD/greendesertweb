import { LoginserviceService } from './../../services/loginservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoserviceService } from 'src/app/services/empleadoservice.service';
import { empleadoModel } from 'src/app/models/empleados/empleados.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'GreenDesert';
  rol!: 'operador'| 'contador' |'secretaria'| 'admin';  
  constructor(private loginService: LoginserviceService,
              private router: Router,
              private auth: LoginserviceService,
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

  logOut(){
    this.loginService.logout().then(()=>{
      this.router.navigate(['Login'])
    }).catch(error => console.log(error))
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
