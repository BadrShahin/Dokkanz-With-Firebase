import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  loggedInUser: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService
  ) { 
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
      else {
        this.isLoggedIn = false;
      }
    })
  }

  ngOnInit() {
    
  }

  onLogoutClick() {
    this.authService.logoutUser();
    this.flashMessagesService.show("You are logged out", { cssClass: "alert-success", timeout: 4000 });
    this.router.navigate(["/login"]);
    this.isLoggedIn = false;
  }

}
