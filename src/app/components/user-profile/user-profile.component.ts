import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // Logged in user 
  loggedUser: any;
  isDataLoaded: boolean = false;

  users: any[];

  editProfileForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBulider: FormBuilder,
    private angularFireAuth: AngularFireAuth,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.userService.getAllUsersData().snapshotChanges().subscribe(users => {
      this.users = users.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      this.users.forEach(user => {
        if (user.Email == this.angularFireAuth.auth.currentUser.email) {
          this.isDataLoaded = true;
          this.loggedUser = user;
        }
      });
    });
    this.editProfileForm = this.formBulider.group({
      Username: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}$")]],
      Password: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      ProfileImage: [''],
      BirthDate: ['']
    });
  }

  editProfile() {
    // this.editProfileForm.value.ProfileImage = this.sanitizer.bypassSecurityTrustStyle(this.editProfileForm.value.ProfileImage);
    console.log(this.sanitizer.bypassSecurityTrustStyle(this.editProfileForm.value.ProfileImage));
    this.userService.updateUserProfile(this.loggedUser.key, this.editProfileForm.value);
  }

}
