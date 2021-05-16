import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationGuard } from './authentication.guard';
import { UsersPanelComponent } from './users-panel/users-panel.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { UsersResolverService } from './users-resolver.service';
import { AdminCheckGuard } from './admin-check.guard';

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
