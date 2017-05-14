import {Component, OnInit} from '@angular/core';
import {Patient} from '../patient';
import {FirebaseService} from '../../services/firebase.service';

declare var firebase: any;
declare var jQuery: any;

@Component({
  selector: 'app-patients',
  templateUrl: 'patients.component.html',
  styleUrls: ['patients.component.css']
})
export class PatientsComponent implements OnInit {
  service: FirebaseService;
  addPat: boolean = false;
  showPat: boolean = false;
  showPatFiltered: boolean = false;
  patientList: Array<any> = [];
  list: any;
  patientFilter: any = {firstName: ''};
  item: Patient;
  patient: Patient = {
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: null,
    age: 0,
    occupation: '',
    birthdate: '',
    genre: ''
  };
  patients: Object[];
  database: any;
  patientAdded: boolean = false;
  needsFetching: boolean = true;

  constructor(firebaseService: FirebaseService) {
    this.service = firebaseService;
    this.database = firebase.database();
  }

  ngOnInit() {
    this.service.getPatientsList();
    this.patients = this.service.patients;
  }

  addPatient() {
    this.addPat = true;
  }

  showPatientFiltered() {
    this.showPat = false;
    this.showPatFiltered = true;
    this.showPatientsLoop();
  }


  isInList() {
    let exist = false;
    for (let item in this.patientList) {
      if (this.patientList[item].id === this.patient.id) {
        exist = true;
        break;
      }
    }
    return exist;
  }

  addPatientInformation() {
    this.patientAdded = true;
    this.patient.age = this.calcAge(this.patient.birthdate);
    if (this.patient.age >= 0) {
      let exist = this.isInList();
      if (exist == false) {
        this.service.savePatient(this.patient);
        this.patientList.push(this.patient);
        this.addPat = false;
        this.patient = {
          id: '',
          firstName: '',
          lastName: '',
          address: '',
          phone: null,
          age: 0,
          occupation: '',
          birthdate: '',
          genre: ''
        };
        jQuery('.modal').modal('hide');
      } else {
        alert("Patient already exists");
      }
    } else {
      alert("Enter a valid birthdate");
    }
  }

  calcAge(birthday) {
    let date: any = new Date(birthday);
    return Math.floor((Date.now() - date) / 31536000000);
  }

  showPatient() {
    this.showPat = true;
    this.showPatFiltered = false;
    if (this.patientAdded || this.needsFetching) {
      this.showPatientsLoop();
    }
    this.needsFetching = false;
  }

  showPatientsLoop() {
    console.log("looping");
    this.patientList = [];
    this.patientFilter.firstName = '';
    this.service.getPatientsList();
    this.patients = this.service.patients;
    this.list = this.patients;
    for (let key in this.list) {
      this.item = {
        id: this.list[key].id,
        firstName: this.list[key].firstName,
        lastName: this.list[key].lastName,
        address: this.list[key].address,
        phone: this.list[key].phone,
        occupation: this.list[key].occupation,
        birthdate: this.list[key].birthdate,
        age: this.calcAge(this.list[key].birthdate),
        genre: this.list[key].genre
      };
      this.patientList.push(this.item);
    }
    this.patientAdded = false;
  }
}
