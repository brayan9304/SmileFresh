import { Component, OnInit } from '@angular/core';
import {Patient} from '../patient';
import {FirebaseService} from '../../services/firebase.service';

declare var firebase: any;

@Component({
  selector: 'app-patients',
  templateUrl: 'patients.component.html',
  styleUrls: ['patients.component.css']
})
export class PatientsComponent implements OnInit {
  service: FirebaseService;
  addPat: boolean = false;
  showPat: boolean = false;
  patientList:Array<any>;
  list: any;
  item: Patient
  patient: Patient = {
    id: '',
    firstName : '',
    lastName : '',
    address : '',
    phone : '',
    occupation : '',
    birthdate : '',
    genre : ''
  };
  patients: Object[];
  database: any;

  constructor(firebaseService: FirebaseService) {
    this.service = firebaseService;
    this.database = firebase.database();
  }

  ngOnInit() {
    this.service.getPatientsList();
    this.patients = this.service.patients;
    console.log(this.patients);
  }

  addPatient() {
    this.addPat = true;
  }

  addPatientInformation() {
    this.service.savePatient(this.patient);
    this.addPat = false;
  }
  showPatient() {
    this.service.getPatientsList();
    this.patients = this.service.patients;
    this.showPat = true;
    this.patientList = [];
    this.list = this.patients;
    for (let key in this.list) {
      this.item  = {
           id: this.list[key].id,
           firstName: this.list[key].firstName,
           lastName: this.list[key].lastName,
           address: this.list[key].address,
           phone: this.list[key].phone,
           occupation: this.list[key].occupation,
           birthdate: this.list[key].birthdate,
           genre: this.list[key].genre
      };
      this.patientList.push(this.item);
    }

  }
}
