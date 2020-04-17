import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SignoutComponent } from './signout/signout.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from './user.service';
import { PlansComponent } from './plans/plans.component';
import { PlanConfirmComponent } from './plan-confirm/plan-confirm.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: PlansComponent},
  { path: 'signup/:type', component: SignupComponent },
  { path: 'passwordreset', component: PasswordResetComponent },
  { path: 'signout', component: SignoutComponent },
  { path: 'planconfirm/:type', component: PlanConfirmComponent, canActivate : [UserService] },
  { path: 'profile', component: ProfileComponent, canActivate : [UserService] },
  { path: 'dashboard', component : DashboardComponent , canActivate : [UserService]},
  { path: 'report/:id', loadChildren: () => import('./report/report.module').then(m => m.ReportModule),canActivate : [UserService] },
  { path: 'trustmark', loadChildren: () => import('./trust-mark/trust-mark.module').then(m => m.TrustMarkModule),canActivate : [UserService]},
  { path: 'resources', loadChildren: () => import('./resources/resources.module').then(m => m.ResourcesModule) },
  { path: 'training', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule) },
  { path: 'community', loadChildren: () => import('./community/community.module').then(m => m.CommunityModule) },
  { path: 'plans', component: PlansComponent},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
