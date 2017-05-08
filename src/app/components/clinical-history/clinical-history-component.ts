import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {ActivatedRoute} from '@angular/router';
import {PatientsHistory} from '../patientsHistory';

declare var firebase: any;
declare var moment: any;

@Component({
  selector: 'app-clinical-history',
  templateUrl: 'clinical-history-component.html',
  styleUrls: ['clinical-history-component.css']
})
export class ClinicalHistoryComponent implements OnInit {
  service: FirebaseService;
  database: any;
  id: number;
  list: any;
  key: any = [];
  showRecord: Boolean = false;
  item: PatientsHistory;
  addHistoryCont: number = 0;
  history: PatientsHistory = {
    elaboratioDate: '',
    idDoctor: null,
    idPatient: null,
    description: ''
  };
  histories: Object[];
  historieList: Array<any> = [];

  constructor(firebaseService: FirebaseService, private route: ActivatedRoute) {
    this.service = firebaseService;
    this.database = firebase.database();
  }

  ngOnInit() {
    this.key = [];
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    var ref = this.database.ref("clinical-histories");
    ref.on("value", (snapshot) => {
      let list = snapshot.val();
      for (let key in list){
        if (this.id == list[key].idPatient){
          this.key.push(key);
        }
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    this.service.getHistorieList();
    this.histories = this.service.histories;
  }

  showRecords() {
    this.addHistoryCont += 1;
    this.service.getPatientsList();
    this.histories = this.service.histories;
    this.showRecord = true;
    this.list = this.histories;
    for (let key in this.list) {
      if(this.addHistoryCont > 1) {
        break;
      }
      this.item = {
        elaboratioDate: this.list[key].elaboratioDate,
        idDoctor: this.list[key].idDoctor,
        idPatient: this.list[key].idPatient,
        description: this.list[key].description
      };
      if(this.key.includes(key)){
        this.historieList.push(this.item);
      }
    }
  }


  saveClinicalHistory() {
    this.historieList.push(this.history);
    this.history.elaboratioDate = moment(Date.now()).format();
    this.history.idPatient = this.id;
    this.service.saveClinicalHistory(this.history);
  }
}
