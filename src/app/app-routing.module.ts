import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPanelComponent } from './components/users-panel/users-panel.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PageNotfoundComponent } from './components/page-notfound/page-notfound.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AdminCheckGuard } from './guards/admin-check.guard';
import { UsersResolverService } from './services/users-resolver.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'about', component: AboutComponent},
  { 
    path: 'users',
    component: UsersPanelComponent,
    canActivate: [AuthenticationGuard],
    canLoad: [AdminCheckGuard],
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)

  },
  { 
    path: 'admin-panel',
    component: AdminDashboardComponent,
    canActivate: [AuthenticationGuard],
    canLoad: [AdminCheckGuard],
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  },
  { path: 'user-profile', component: UserProfileComponent, resolve: { user: UsersResolverService}, canActivate: [AuthenticationGuard]},
  { path: '**', component: PageNotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
