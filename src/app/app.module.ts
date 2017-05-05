import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {CalendarComponent} from 'ap-angular2-fullcalendar/src/calendar/calendar';


import { AppComponent } from './app.component';

import { CustomCalendarComponent } from './components/calendar/calendar.component';

import { AngularFireModule } from 'angularfire2';
import { FirebaseService } from './services/firebase.service';
import { PatientsComponent } from './components/patients/patients.component';
import {NavbarComponent} from "./components/navbar/navbar.component";

export const firebaseConfig  = {
  apiKey: 'AIzaSyBztQAoQjoALzEByMaBdcru6T_U7_7tT4o',
  authDomain: 'smilefresh-c4304.firebaseapp.com',
  databaseURL: 'https://smilefresh-c4304.firebaseio.com',
  projectId: 'smilefresh-c4304',
  storageBucket: 'smilefresh-c4304.appspot.com',
  messagingSenderId: '874134046342'

};
export const appRoutes : Routes = [
  //{path:'', component : AppComponent},
  {path:'patients', component: PatientsComponent},
  {path:'calendar', component : CustomCalendarComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CustomCalendarComponent,
    PatientsComponent,
    NavbarComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes)
  ],

  providers: [FirebaseService],
  bootstrap: [AppComponent]
})

export class AppModule { }
