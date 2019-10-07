import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { catchError } from 'rxjs/operators';
import { UserData } from 'src/app/models/SpecificUserData';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  // Get all Users
  user: UserData;
  userRepos: any;
  isDataLoaded: boolean;
  isUserProfile: boolean;
  isUserRepos: boolean;
  
  loggedUser: User;
  users: any[];
  tempLoggedUser: any;

  user_login_repos: string;
  per_page: number;
  page: number;


  constructor(
    private userService: UserService,
    private angularFireAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getLoggedUser();
    // Get User Details
    this.getUserDetails();
    // Get User Repos
    this.getUserRepos();
  }

  getLoggedUser(){
    this.userService.getAllUsersData().snapshotChanges().subscribe(users => {
      this.users = users.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      this.users.forEach(user => {
        if (user.Email == this.angularFireAuth.auth.currentUser.email) {
          this.loggedUser = user;
        }
      });
    });
  }

  getUserDetails() {
    const user_login = this.activatedRoute.snapshot.params["user_login"];
    console.log(user_login);
    this.userService.getSpecificUserData(user_login).subscribe(response => {
      if (!response) {
        this.userService.handleError;
      }
      this.user = response as UserData;
      this.isDataLoaded = true;
      if (user_login != null) {
        this.isUserProfile = true;
      }
    },
      catchError(this.userService.handleError)
    );
  }

  addToFavorites(user: string){
    this.getLoggedUser();
    document.getElementById('btnFavorite').style.color = 'orange';
    this.loggedUser.Favorites.push(user);
    // console.log(this.loggedUser);
    this.tempLoggedUser = this.loggedUser;
    this.userService.updateUserProfile(this.tempLoggedUser.key, this.loggedUser);
    console.log(this.angularFireAuth.auth.currentUser.email);
    console.log(user);
  }

  getUserRepos() {
    this.activatedRoute.queryParams.subscribe(params => {
      // Get log parameter 
      this.user_login_repos = this.activatedRoute.snapshot.params["user_login_repos"];

      console.log(this.user_login_repos)
      // Get per_page parameter 
      this.per_page = params['per_page'];
      console.log(this.per_page)
      // Get page parameter
      this.page = params['page'];
      console.log(this.page);

      // filter for specific users
      if (this.user_login_repos != null) {
        // for all matched values
        this.userService.getUserRepos(this.user_login_repos).subscribe(response => {
          if (!response) {
            this.userService.handleError;
          }
          this.userRepos = response as any[];
          console.log(this.userRepos)
          this.isDataLoaded = true;
          this.isUserRepos = true;
        },
          catchError(this.userService.handleError)
        );
      } else {
        this.isDataLoaded = false;
      }

    });
  }

}
