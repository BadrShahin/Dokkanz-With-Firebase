import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBulider: FormBuilder,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBulider.group({
      Email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}$")]],
      Password: ['', [Validators.required]],
    });
  }

  login() {
    this.authService.loginUser(this.loginForm.value.Email, this.loginForm.value.Password)
      .then(res => {
        this.flashMessagesService.show("You are logged in", {cssClass: "alert-success", timeout: 4000});
        this.router.navigate(["/"]);
      })
      .catch(err => {
        this.flashMessagesService.show(err , {cssClass: "alert-danger", timeout: 4000});
        this.router.navigate(["/login"]);
      })
  }

}
