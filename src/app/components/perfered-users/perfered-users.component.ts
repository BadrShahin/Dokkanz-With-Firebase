import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserLogin } from 'src/app/models/UserData';
import { catchError } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-perfered-users',
  templateUrl: './perfered-users.component.html',
  styleUrls: ['./perfered-users.component.css']
})
export class PerferedUsersComponent implements OnInit {

  users: UserLogin[];
  loggedUser: User;
  registerdUsers: any[];
  favoritesUsers: UserLogin[] = [];
  isDataLoaded: boolean;
  tempLoggedUser: any;

  constructor(
    private userService: UserService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.intiateUserData();
  }

  ngOnInit() {
    this.intiateUserData();
    this.getLoggedUser();
  }

  intiateUserData() {
    //console.log(this.loggedUser);
    this.userService.getUsers("users").subscribe(response => {
      if (!response) {
        this.userService.handleError;
      }
      this.users = response as UserLogin[];
    },
      catchError(this.userService.handleError)
    );
  }

  getLoggedUser() {
    this.userService.getAllUsersData().snapshotChanges().subscribe(users => {
      this.registerdUsers = users.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      this.registerdUsers.forEach(user => {
        if (user.Email == this.angularFireAuth.auth.currentUser.email) {
          this.loggedUser = user;
        }
      });
      this.getFavoritesUsers();
    });
  }

  getFavoritesUsers() {
    for (let index = 0; index < this.loggedUser.Favorites.length; index++) {
      if (this.loggedUser.Favorites[index] != "" && this.loggedUser.Favorites[index] != null) {
        this.favoritesUsers.push(this.users.find(user => user.login == this.loggedUser.Favorites[index]));
      }
    }
    this.isDataLoaded = true;
  }

  deleteFavoritesUsers(login: string) {
    this.favoritesUsers.splice(0, this.favoritesUsers.length);
    this.loggedUser.Favorites.splice(this.loggedUser.Favorites.indexOf(login, 1));
    this.tempLoggedUser = this.loggedUser;
    this.userService.updateUserProfile(this.tempLoggedUser.key, this.loggedUser);
  }
}
