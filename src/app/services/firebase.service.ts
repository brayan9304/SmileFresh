import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class FirebaseService {
  patients: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) { }

  getPatiens(){
    this.patients = this.af.database.list('/Patients') as FirebaseListObservable<Patient[]>;
    return this.patients;
  }
}


interface Patient {
  $id: string;
  name: string;
}
