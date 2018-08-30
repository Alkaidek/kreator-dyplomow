import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { LandscapeComponent } from './landscape/landscape.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';

const firebase = {
  apiKey: 'AIzaSyB2EVW_LFNCbihRQ29rZTYtYLT_Ni_AvT8',
  authDomain: 'dyplomator.firebaseapp.com',
  databaseURL: 'https://dyplomator.firebaseio.com',
  projectId: 'dyplomator',
  storageBucket: 'dyplomator.appspot.com',
  messagingSenderId: '633386395085'
}

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    LandscapeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
