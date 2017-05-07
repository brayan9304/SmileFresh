import { Component, OnInit } from '@angular/core';
import {Doctor} from '../doctor';
import {FirebaseService} from '../../services/firebase.service';

declare var firebase: any;

@Component({
  selector: 'app-doctors',
  templateUrl: 'doctors.component.html',
  styleUrls: ['doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  service: FirebaseService;
  database: any;
  myDoctor = new Doctor;

  constructor(firebaseService: FirebaseService) {
    this.service = firebaseService;
    this.database = firebase.database();
  }

  addDoctor(){
    console.log(this.myDoctor);
  }

  ngOnInit() {
  }

}