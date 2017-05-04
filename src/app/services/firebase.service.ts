import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Injectable()
export class FirebaseService {
  patients: FirebaseListObservable<any[]>;
  events: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {}

  getPatiens(){
    this.patients = this.af.database.list('/Patients') as FirebaseListObservable<Patient[]>;
    return this.patients;
  }
  getEvents(){
    this.events = this.af.database.list('/events') as FirebaseListObservable<Patient[]>;
    return this.events;
  }
  saveEvent(events){
    this.events = this.af.database.list('/events') as FirebaseListObservable<Patient[]>;
    this.events.push(events);
    return null;
  }
}


interface Patient {
  $id: string;
  name: string;
}
