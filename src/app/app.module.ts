import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';

import { CookieService } from 'ngx-cookie-service';

import { CommonModule } from '@angular/common';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { ChartsModule } from 'ng2-charts';
import { UsersStatisticsComponent } from './components/users-statistics/users-statistics.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersPanelComponent } from './components/users-panel/users-panel.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PageNotfoundComponent } from './components/page-notfound/page-notfound.component';
import { AcceptDialogComponent } from './components/accept-dialog/accept-dialog.component';
import { OptionRcaComponent } from './components/option-rca/option-rca.component';
import { OptionCarteidentitateComponent } from './components/option-carteidentitate/option-carteidentitate.component';
import { OptionRovComponent } from './components/option-rov/option-rov.component';
import { OptionItpComponent } from './components/option-itp/option-itp.component';
import { SubscriptionsPanelComponent } from './components/subscriptions-panel/subscriptions-panel.component';
import { UserEditDialogComponent } from './components/user-edit-dialog/user-edit-dialog.component';
import { MaterialModule } from './components/material/material.module';
import { UsersResolverService } from './users-resolver.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
    AcceptDialogComponent,
    OptionRcaComponent,
    OptionCarteidentitateComponent,
    OptionRovComponent,
    OptionItpComponent,
    SubscriptionsPanelComponent,
    UserEditDialogComponent,
    UsersStatisticsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSortModule,
    AdminPanelModule,
    ChartsModule,
    NgxChartsModule




  ],
  providers: [
    UsersResolverService,
    CookieService,
    
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
