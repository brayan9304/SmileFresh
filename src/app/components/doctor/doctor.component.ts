import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {Doctor} from "../doctor";

declare var firebase: any;

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  service: FirebaseService;
  addPat: boolean = false;
  showPat: boolean = false;
  doctorList: Array<any> = [];
  list: any;
  item: Doctor;
  addDoctorCont: number = 0;
  doctor: Doctor = {
    id: '',
    firstName: '',
    lastName: '',
    phone: '',
    genre: ''
  };
  doctors: Object[];
  database: any;
  constructor(firebaseService: FirebaseService) {
    this.service = firebaseService;
    this.database = firebase.database();
  }

  ngOnInit() {
    this.service.getDoctorsList();
    this.doctors = this.service.doctors;
  }

  addDoctor() {
    this.addPat = true;
  }

  addDoctorInformation() {
    this.service.saveDoctor(this.doctor);
    this.doctorList.push(this.doctor);
    this.addPat = false;
  }

  showDoctor() {
    this.addDoctorCont += 1;
    this.service.getDoctorsList();
    this.doctors = this.service.doctors;
    this.showPat = true;
    this.list = this.doctors;
    for (let key in this.list) {
      if(this.addDoctorCont > 1) {
        break;
      }
      this.item = {
        id: this.list[key].id,
        firstName: this.list[key].firstName,
        lastName: this.list[key].lastName,
        phone: this.list[key].phone,
        genre: this.list[key].genre
      };
      this.doctorList.push(this.item);
    }

  }

}
