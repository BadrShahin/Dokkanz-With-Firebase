import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  
  loginUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    })
  }
  getAuth() {
    return this.angularFireAuth.authState;
  }

  currentUser(){
    console.log(this.angularFireAuth.auth.currentUser.uid);
  }

  logoutUser() {
    this.angularFireAuth.auth.signOut;
  }

  registerUser(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    })
  }
}
