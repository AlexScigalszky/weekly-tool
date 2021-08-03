import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AppbarComponent } from './components/appbar/appbar.component';
import { HomeComponent } from './pages/home/home.component';
import { QuestionItemComponent } from './components/question-item/question-item.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionItemModalComponent } from './components/question-item-modal/question-item-modal.component';
import { QuestionService } from './services/question.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VotingService } from './services/voting.service';
import { MinesweeperComponent } from './components/minesweeper/minesweeper.component';
import { DamonKillerComponent } from './components/damon-killer/damon-killer.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    AppbarComponent,
    HomeComponent,
    QuestionItemComponent,
    QuestionListComponent,
    QuestionItemModalComponent,
    MinesweeperComponent,
    DamonKillerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatDialogModule,
    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [QuestionService, VotingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
