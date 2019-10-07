import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { User } from '../models/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/internal/operators/map';
import { UserData } from '../models/SpecificUserData';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: AngularFireList<User[]>;
  user: AngularFireObject<any>;
  Favorites = [] as string[];

  // Error Data
  errorData: {};

  constructor(
    private httpClient: HttpClient,
    private angularFireDatabase: AngularFireDatabase
  ) {
    this.users = this.angularFireDatabase.list('/users') as AngularFireList<User[]>;
  }
  addUser(user: any) {
    this.Favorites.push("");
    user.Favorites = this.Favorites;
    this.users.push(user);
  }

  getUsers(url: string) {
    return this.httpClient.get(`${environment.baseUrl}${url}`);
  }


  updateUserProfile(key:string, user: any){
    return this.users.update(key, user);
  }

  getAllUsersData() {
    return this.users;
  }

  getSpecificUserData(user_login: string){
    return this.httpClient.get(`${environment.baseUrl}users/${user_login}`);
  }

  getUserRepos(user_login: string) {
    return this.httpClient.get(`${environment.baseUrl}users/${user_login}/repos`);
  }

  // Handel Error Method
  public handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('Client-Side error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }

}
