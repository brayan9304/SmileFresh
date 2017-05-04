import {Component, OnInit} from '@angular/core';
import {FirebaseService} from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  patients: any;

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.firebaseService.getPatiens().subscribe(patients => {
      this.patients = patients;
    });
  }
}
