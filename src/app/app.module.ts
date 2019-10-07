import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

//Firebase imports 
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

// Angular Material imports 
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatRadioModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersComponent } from './components/users/users.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PerferedUsersComponent } from './components/perfered-users/perfered-users.component';

// const firebaseConfig = {
//   apiKey: "AIzaSyCMX7H-6u0MXZOAdimSc77UNo6gu8AWceo",
//   authDomain: "dokkanz-9b743.firebaseapp.com",
//   databaseURL: "https://dokkanz-9b743.firebaseio.com",
//   projectId: "dokkanz-9b743",
//   storageBucket: "",
//   messagingSenderId: "689252389436",
//   // appId: "1:689252389436:web:fc1692207923aba53aa939",
//   // measurementId: "G-Q1LXYE5TTZ"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCMX7H-6u0MXZOAdimSc77UNo6gu8AWceo",
  authDomain: "dokkanz-9b743.firebaseapp.com",
  databaseURL: "https://dokkanz-9b743.firebaseio.com",
  projectId: "dokkanz-9b743",
  storageBucket: "dokkanz-9b743.appspot.com",
  messagingSenderId: "689252389436",
  appId: "1:689252389436:web:fc1692207923aba53aa939",
  measurementId: "G-Q1LXYE5TTZ"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    UserProfileComponent,
    UsersComponent,
    UserDetailsComponent,
    PerferedUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatRadioModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [
    AngularFireDatabase,
    AngularFireAuth,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
