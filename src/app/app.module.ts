import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FirebaseService } from './services/firebase.service';
import { PatientsComponent } from './components/patients/patients.component';
import { ClinicalHistoryComponent } from './components/clinical-history/clinical-history-component';
import { NavbarComponent} from './components/navbar/navbar.component';
import { DoctorComponent } from './components/doctor/doctor.component';


declare var firebase: any;

const config = {
  apiKey: 'AIzaSyBztQAoQjoALzEByMaBdcru6T_U7_7tT4o',
  authDomain: 'smilefresh-c4304.firebaseapp.com',
  databaseURL: 'https://smilefresh-c4304.firebaseio.com',
  projectId: 'smilefresh-c4304',
  storageBucket: 'smilefresh-c4304.appspot.com',
  messagingSenderId: '874134046342'
};
firebase.initializeApp(config);


export const appRoutes: Routes = [
  {path: 'patients', component: PatientsComponent},
  {path: 'calendar', component : CalendarComponent},
  {path: 'doctors', component : DoctorComponent},
  {path: 'clinical-history/:id', component : ClinicalHistoryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    PatientsComponent,
    DoctorComponent,
    ClinicalHistoryComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],

  providers: [FirebaseService],
  bootstrap: [AppComponent]
})

export class AppModule { }
