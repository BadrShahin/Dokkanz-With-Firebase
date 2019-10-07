import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Create FormGroup Instance
  registerForm: FormGroup;

  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBulider: FormBuilder,
    private userService: UserService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBulider.group({
      Username: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}$")]],
      Password: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      ProfileImage: [''],
      BirthDate: ['']
    });
  }


  register() {
    this.authService.registerUser(this.registerForm.value.Email, this.registerForm.value.Password)
      .then((res) => {
        
        this.flashMessagesService.show("New user registered", { cssClass: "alert-success", timeout: 4000 });
        this.router.navigate(["/"]);

        // Add User to Users Collection in Firebase
        // Object.assign(this.user, );
        this.userService.addUser(JSON.parse(JSON.stringify(this.registerForm.value)));
        
      }).catch((err) => {
        this.flashMessagesService.show(err, { cssClass: "alert-danger", timeout: 4000 });
        this.router.navigate(["/register"]);
      });
  }

}
