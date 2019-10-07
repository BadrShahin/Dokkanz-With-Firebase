import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor (
        private router: Router, 
        private angularFireAuth: AngularFireAuth
    ) { }

    canActivate():Observable<boolean>{
        return this.angularFireAuth.authState.map(auth => {
            if (!auth){
                this.router.navigate(["/login"]);
                return false;
            }else {
                return true;
            }
        })
    }
}