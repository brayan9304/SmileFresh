import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { CalendarComponent } from './components/calendar/calendar.component';

import { AngularFireModule } from 'angularfire2';
import { FirebaseService } from './services/firebase.service';

export const firebaseConfig  = {
  apiKey: 'AIzaSyBztQAoQjoALzEByMaBdcru6T_U7_7tT4o',
  authDomain: 'smilefresh-c4304.firebaseapp.com',
  databaseURL: 'https://smilefresh-c4304.firebaseio.com',
  projectId: 'smilefresh-c4304',
  storageBucket: 'smilefresh-c4304.appspot.com',
  messagingSenderId: '874134046342'

};

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],

  providers: [FirebaseService],
  bootstrap: [CalendarComponent, AppComponent]
})

export class AppModule { }
