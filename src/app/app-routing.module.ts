import { AppComponent } from './app.component';
import { MemberHomeComponent } from './member-home/member-home.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: 'member-home', component: MemberHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
