import { Injectable } from '@angular/core';
import {Patient} from "../components/patient";
import {Doctor} from "../components/doctor";
import {PatientsHistory} from '../components/patientsHistory';



declare var firebase: any


@Injectable()
export class FirebaseService {
  database = firebase.database();
  eventsRef = this.database.ref("events");
  patientsRef = this.database.ref("patients");
  doctorsRef = this.database.ref("doctors");
  doctors: Doctor[];
  historyRef = this.database.ref("clinical-histories/");
  patients: Patient[];
  histories: PatientsHistory[];
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
  saveClinicalHistory(history) {
    this.historyRef.push().set(history);
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

  getHistorieList(){
    var gotData = (data => {
      this.loadHistories(data.val());
    });
    var errData = (error => {
      console.log(error);
    });
    this.historyRef.on('value', gotData, errData);
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
    });
    var errData = (error => {
      console.log(error);
    });
    this.doctorsRef.on('value', gotData, errData);
  }

  loadDoctors(data) {
    this.doctors = data;
  }
  loadHistories(data){
    this.histories = data;
  }
}



