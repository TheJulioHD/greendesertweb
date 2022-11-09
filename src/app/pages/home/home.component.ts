import { LoginserviceService } from './../../services/loginservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'GreenDesert';
  constructor(private loginService: LoginserviceService,
              private router: Router) { }

  ngOnInit(): void {
  }
  logOut(){
    this.loginService.logout().then(()=>{
      this.router.navigate(['Login'])
    }).catch(error => console.log(error))
  }
}
