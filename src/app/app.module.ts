import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { LandscapeComponent } from './landscape/landscape.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';

const firebase = {
  apiKey: 'AIzaSyBVrrzgYQEb-cKvNHozchs4nYe1yBiiK7c',
  authDomain: 'kreator-dyplomow.firebaseapp.com',
  databaseURL: 'https://kreator-dyplomow.firebaseio.com',
  projectId: 'kreator-dyplomow',
  storageBucket: 'kreator-dyplomow.appspot.com',
  messagingSenderId: '676994729311'
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
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
