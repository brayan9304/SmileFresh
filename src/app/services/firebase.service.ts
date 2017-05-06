import { Injectable } from '@angular/core';


@Injectable()
export class FirebaseService {

  constructor() {}


  getEvents(database){
  }
  saveEvent(events, database) {
    var eventsRef = database.ref("events");
    eventsRef.push().set(events);
    return null;
  }
  savePatient(patient,database){
    var eventsRef = database.ref("events");
    eventsRef.push().set(patient);
    return null;
  }
}


interface Patient {
  $id: string;
  name: string;
}
