import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarSignedInComponent } from './navbar-signed-in/navbar-signed-in.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MemberHomeComponent } from './member-home/member-home.component';
import { StickyFooterComponent } from './sticky-footer/sticky-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarSignedInComponent,
    FooterComponent,
    SignInComponent,
    AboutComponent,
    RegisterComponent,
    MemberHomeComponent,
    StickyFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
