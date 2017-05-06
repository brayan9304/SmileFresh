import { Component, OnInit } from '@angular/core';
import {Patient} from "../patient";
import {FirebaseService} from "../../services/firebase.service";

declare var firebase: any;

@Component({
  selector: 'app-patients',
  templateUrl: 'patients.component.html',
  styleUrls: ['patients.component.css']
})
export class PatientsComponent implements OnInit {
  service: FirebaseService;
  addPat: boolean = false;
  patient: Patient;
  database : any;

  constructor(firebaseService: FirebaseService) {
    this.service = firebaseService;
    this.database = firebase.database();
  }

  ngOnInit() {
  }

  addPatient() {
    this.addPat = true;
  }

  addPatientInformation() {
    this.service.savePatient(this.patient, this.database);
    this.addPat = false;
  }
}
