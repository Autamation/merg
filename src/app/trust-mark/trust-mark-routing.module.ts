import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrustmarkHomeComponent } from './trustmark-home/trustmark-home.component';


const routes: Routes = [
  { path: '', component: TrustmarkHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrustMarkRoutingModule { }
