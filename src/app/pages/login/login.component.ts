import { LoginserviceService } from './../../services/loginservice.service';
import { Component, OnInit,  } from '@angular/core';
import {  Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ltslogin: FormGroup;
  ltslogins: any[]= []
  submited=false;
  constructor(private router: Router, 
              private loginService: LoginserviceService,
              private fb: FormBuilder,) {
                this.ltslogin =this.fb.group({
                  Email:['',     [Validators.required, Validators.minLength(5), Validators.email]],
                  Pass:['',      [Validators.required, Validators.minLength(8)]],
                })
               }

  ngOnInit(): void {
  }

  onSumit(){
    const login: any={
      email:this.ltslogin.value.Email,
      pass:this.ltslogin.value.Pass,
    }
    this.loginService.loginUser(login.email, login.pass).then(()=>{
      
      this.router.navigate(['home']);
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario no existente',
        footer: 'ingrese los datos corectos'
      })
    })
  }

}
