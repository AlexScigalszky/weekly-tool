import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
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
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VotingService } from './services/voting.service';
import { FullscreenButtonComponent } from './components/fullscreen-button/fullscreen-button.component';
import { NewRoomModalComponent } from './components/new-room-modal/new-room-modal.component';
import { VersionComponent } from './components/version/version.component';
import { BreakoutRoomsComponent } from './pages/breakout-rooms/breakout-rooms.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { BreakoutRoomsFirebaseService } from './services/breakout-rooms-firebase.service';
import { AniversariesComponent } from './components/aniversaries/aniversaries.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RetroModule } from './retro/retro.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { PinnedTopicsComponent } from './components/pinned-topics/pinned-topics.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionItemComponent,
    QuestionListComponent,
    QuestionItemModalComponent,
    FullscreenButtonComponent,
    NewRoomModalComponent,
    VersionComponent,
    BreakoutRoomsComponent,
    SettingsComponent,
    AniversariesComponent,
    PinnedTopicsComponent,
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
    MatMenuModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RetroModule,
    HttpClientModule,
    NgxEditorModule,
  ],
  providers: [
    QuestionService,
    VotingService,
    BreakoutRoomsFirebaseService,
    { provide: Window, useValue: window },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
