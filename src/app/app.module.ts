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
  apiKey: 'AIzaSyB7P4-5PpvWM1D5dZ6rIeNRlczTt1nlBS4',
  authDomain: 'diploma-93bc1.firebaseapp.com',
  databaseURL: 'https://diploma-93bc1.firebaseio.com',
  projectId: 'diploma-93bc1',
  storageBucket: 'diploma-93bc1.appspot.com',
  messagingSenderId: '739562136666'
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
