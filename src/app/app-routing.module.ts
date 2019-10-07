import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UserDetailsComponent } from './components/user-details/user-details.component';


const routes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/:user_login_repos/repos', component: UserDetailsComponent, canActivate: [AuthGuard]},
  { path: 'users/:user_login', component: UserDetailsComponent, canActivate: [AuthGuard] },
  { path: 'users/:per_page/:since', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/:q/:per_page/:page', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: UsersComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
