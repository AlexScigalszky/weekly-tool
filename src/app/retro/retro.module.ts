import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetroDashboardComponent } from './retro-dashboard/retro-dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RetroDashboardComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RetroModule {}
