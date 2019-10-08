import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserLogin } from 'src/app/models/UserData';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UserLogin[];


  // Pagination parameters.
  currentPageNumber: Number = 1;
  per_page: number;
  since: number;
  isPaginated: boolean;
  startFrom: number;

  //search paramters
  searchValue: string;
  page: number;
  hasValue: boolean;
  searchedUsers: UserLogin[];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // console.log(this.authService.getAuth());
    this.userService.getUsers("users").subscribe(response => {
      if (!response) {
        this.userService.handleError;
      }
      this.users = response as UserLogin[];
      // Set Pagination
      this.setPagination();

      this.searchMethod();
    },
      catchError(this.userService.handleError)
    );
  }

  setPagination() {
    this.activatedRoute.queryParams.subscribe(params => {

      // Get per_page parameter 
      this.per_page = params['per_page'];
      // Get since parameter
      this.since = params['since'];
      this.startFrom = this.users.findIndex(user => user.id == this.since);
      this.startFrom = Math.ceil(this.startFrom / this.per_page) + 1;
      this.currentPageNumber = this.since;

      if (this.per_page != null && this.since != null) {
        this.isPaginated = true;
      } else {
        this.isPaginated = false;
      }

    });
  }

  searchMethod() {
    this.activatedRoute.queryParams.subscribe(params => {
      // Get search value parameter 
      this.searchValue = params['q'];
      console.log(this.searchValue);
      // Get per_page parameter 
      this.per_page = params['per_page'];
      // Get page parameter
      this.page = params['page'];
      this.currentPageNumber = this.page;

      // filter for specific users
      if (this.searchValue != null && this.per_page != null && this.page != null) {
        this.hasValue = true;
        // for all matched values
        this.searchedUsers = this.users.filter(user => user.login.includes(this.searchValue));
        
        //// for all users that start with search value 
        // this.searchedUsers = this.users.filter(user => user.login.startsWith(this.searchValue));
      } else {
        this.hasValue = false;
      }

    });
  }
}
