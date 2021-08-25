import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreakoutRoomsComponent } from './pages/breakout-rooms/breakout-rooms.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'breakout', component: BreakoutRoomsComponent },
  { path: ':room', component: HomeComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
