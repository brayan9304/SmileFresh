import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2";

@Component({
  selector: 'app-patients',
  templateUrl: 'patients.component.html',
  styleUrls: ['patients.component.css']
})
export class PatientsComponent implements OnInit {
  item: FirebaseObjectObservable<any>;
  constructor(db : AngularFireDatabase) {
    this.item = db.object('/patients');
  }

  ngOnInit() {
  }

  addPatient(){
    firebase.database().ref('/patients').push("new data");
  }



}
