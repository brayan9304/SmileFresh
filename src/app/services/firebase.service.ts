import { Injectable } from '@angular/core';


@Injectable()
export class FirebaseService {

  constructor() {}


  getEvents(database){
  }
  editEvent(key,events,database){
    var eventsRef = database.ref("events/"+key);
    eventsRef.set(events);
    return null;
  }
  saveEvent(events, database) {
    var eventsRef = database.ref("events");
    eventsRef.push().set(events);
    return null;
  }
  savePatient(patient,database){
    var eventsRef = database.ref("patients");
    eventsRef.push().set(patient);
    return null;
  }
}


interface Patient {
  $id: string;
  name: string;
}
