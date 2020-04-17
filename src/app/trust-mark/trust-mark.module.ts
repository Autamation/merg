import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrustMarkRoutingModule } from './trust-mark-routing.module';
import { TrustmarkHomeComponent } from './trustmark-home/trustmark-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TrustmarkHomeComponent],
  imports: [
    CommonModule,
    TrustMarkRoutingModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class TrustMarkModule { }
