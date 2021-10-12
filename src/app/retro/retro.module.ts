import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetroDashboardComponent } from './retro-dashboard/retro-dashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { RetroService } from './services/retro.service';
import { MatIconModule } from '@angular/material/icon';
import { ItemListComponent } from './components/item-list/item-list.component';
import { RetroInputComponent } from './components/retro-input/retro-input.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    RetroDashboardComponent,
    ItemListComponent,
    RetroInputComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatCommonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [RetroService],
})
export class RetroModule {}
