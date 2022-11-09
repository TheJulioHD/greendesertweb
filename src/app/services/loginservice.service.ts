import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth'
@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private auth: Auth) { }

registerUser(email: any, pass: any){
  return createUserWithEmailAndPassword(this.auth, email, pass);
}
  loginUser(email: any, pass: any){
    return signInWithEmailAndPassword(this.auth, email, pass);
  }
  logout(){
    return signOut(this.auth);
  }

}
