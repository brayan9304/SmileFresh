import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import { ActivatedRoute, Params } from '@angular/router';

declare var firebase: any;

@Component({
  selector: 'app-clinical-history',
  templateUrl: 'clinical-history-component.html',
  styleUrls: ['clinical-history-component.css']
})
export class ClinicalHistoryComponent implements OnInit {
  service: FirebaseService;
  database: any;
  id: number;
  doctor: string;
  description: string = 'oelo';

  constructor(firebaseService: FirebaseService, private route: ActivatedRoute) {
    this.service = firebaseService;
    this.database = firebase.database();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    console.log(this.id);
  }
}
