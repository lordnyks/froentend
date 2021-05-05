import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MaterialModule } from './material/material.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationGuard } from './authentication.guard';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';
import { UsersPanelComponent } from './users-panel/users-panel.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { AcceptDialogComponent } from './accept-dialog/accept-dialog.component';
import { UsersResolverService } from './users-resolver.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    UsersPanelComponent,
    AdminDashboardComponent,
    UserProfileComponent,
    PageNotfoundComponent,
    AcceptDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSortModule  
  ],
  providers: [
    UsersResolverService,
    
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  
  }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  public title: string = "test";
}
