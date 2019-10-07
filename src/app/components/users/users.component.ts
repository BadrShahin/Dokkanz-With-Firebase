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
  countOfPages: Number;
  per_page: number;
  since: number;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.authService.getAuth());
    this.userService.getUsers("users").subscribe(response => {
      if (!response) {
        this.userService.handleError;
      }
      this.users = response as UserLogin[];
      //console.log(this.per_page);
      this.countOfPages = Math.ceil(this.users.length / 5);
    },
      catchError(this.userService.handleError)
    );
  }

  setPagination() {

    // Get per_page parameter 
    this.per_page = this.activatedRoute.snapshot.params['per_page'];
    console.log(this.per_page);
    // Get since parameter
    this.since = this.activatedRoute.snapshot.params['since'];

  }

}
