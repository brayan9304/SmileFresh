import { Injectable } from '@angular/core';
import {Patient} from "../components/patient";
import {Doctor} from "../components/doctor";



declare var firebase: any


@Injectable()
export class FirebaseService {
  database = firebase.database();
  eventsRef = this.database.ref("events");
  patientsRef = this.database.ref("patients");
  doctorsRef = this.database.ref("doctors");
  doctors: Doctor[];
  patients: Patient[];
  constructor() {}

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

  saveDoctor(doctorAdded){
    this.doctorsRef.push().set(doctorAdded);
    return null;
  }

  getDoctorsList(){
    var gotData = (data => {
      this.loadDoctors(data.val());
      console.log(this.doctors);
    });
    var errData = (error => {
      console.log(error);
    });
    this.doctorsRef.on('value', gotData, errData);
  }

  loadDoctors(data){
    this.doctors = data;
  }
}



