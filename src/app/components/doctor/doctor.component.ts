import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {Doctor} from '../doctor';

declare var firebase: any;
declare var jQuery: any;

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  service: FirebaseService;
  addDoc: boolean = false;
  showDoc: boolean = false;
  showDocFiltered: boolean = false;
  doctorList: Array<any> = [];
  doctorFilter: any = { firstName: '' };
  list: any;
  item: Doctor;
  doctor: Doctor = {
    id: '',
    firstName: '',
    lastName: '',
    phone: null,
    genre: '',
    workingDays: ''
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
    jQuery('.selectpicker').selectpicker({
    });

  }

  addDoctor() {
    this.addDoc = true;
  }

  showDoctorsFiltered(){
    this.service.getDoctorsList();
    this.doctors = this.service.doctors;
    this.showDoc = false;
    this.showDocFiltered = true;
    this.list = this.doctors;
    for (let key in this.list) {
      this.item = {
        id: this.list[key].id,
        firstName: this.list[key].firstName,
        lastName: this.list[key].lastName,
        phone: this.list[key].phone,
        genre: this.list[key].genre,
        workingDays: this.list[key].workingDays
      };
      this.doctorList.push(this.item);
    }
  }

  addDoctorInformation() {
    let exist = false;
    for (let item in this.doctorList) {
      if (this.doctorList[item].id === this.doctor.id) {
        exist = true;
        break;
      }
    }
    if (exist == false) {
      this.service.saveDoctor(this.doctor);
      this.doctorList.push(this.doctor);
      this.addDoc = false;
      this.doctor = {
        id: '',
        firstName: '',
        lastName: '',
        phone: null,
        genre: '',
        workingDays: ''
      };
      jQuery('.modal').modal('hide');
    } else{
      alert("Doctor already exists");
    }
  }

  showDoctor() {
    this.doctorList = [];
    this.service.getDoctorsList();
    this.doctors = this.service.doctors;
    this.showDoc = true;
    this.showDocFiltered = false;
    this.list = this.doctors;
    for (let key in this.list) {
      this.item = {
        id: this.list[key].id,
        firstName: this.list[key].firstName,
        lastName: this.list[key].lastName,
        phone: this.list[key].phone,
        genre: this.list[key].genre,
        workingDays: this.list[key].workingDays
      };
      this.doctorList.push(this.item);
    }

  }

}
