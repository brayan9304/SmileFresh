import { Injectable } from '@angular/core';
import {Patient} from "../components/patient";



declare var firebase: any


@Injectable()
export class FirebaseService {
  database = firebase.database();
  eventsRef = this.database.ref("events");
  patientsRef = this.database.ref("patients");
  patients: Patient[];
  constructor() {}
  editEvent(key, events) {
    var eventsRef = this.database.ref("events/"+key);
    eventsRef.set(events);
    return null;
  }

  saveEvent(events) {
    this.eventsRef.push().set(events);
    return null;
  }
  savePatient(patientAdded){
    this.patientsRef.push().set(patientAdded);
    return null;
  }

  getPatientsList(){
    var gotData = (data => {
      this.loadPatients(data.val());
    });
    var errData = (error => {
      console.log(error);
    });
    this.patientsRef.on('value', gotData, errData);
  }

  loadPatients(data){
    this.patients = data;
  }
}



