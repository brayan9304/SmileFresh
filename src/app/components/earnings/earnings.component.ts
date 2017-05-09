import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {EventCalendar} from "../event-date";

declare var firebase: any;

@Component({
  selector: 'earnings-component',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit {
  month;
  service: FirebaseService;
  showEvent: boolean = false;
  showEventFiltered: boolean = false;
  eventsList: Array<any> = [];
  list: any;
  item: EventCalendar;
  eventData: EventCalendar= {
    date: '',
    startTime: '',
    endTime: '',
    doctor: '',
    price: null,
    patient: '',
    sold:false
  };
  events: Object[];
  database: any;

  constructor(firebaseService: FirebaseService) {
    this.service = firebaseService;
    this.database = firebase.database();
  }

  ngOnInit() {
    this.service.getEventsList();
    this.events = this.service.doctors;
  }

  exist(event){
    for(let item of this.eventsList){
      if(event.doctor === item.doctor){
        return true;
      }
    }
    return false;
  }

  showEvents() {
    this.eventsList=[];
    let listMonth=[];
    this.service.getEventsList();
    this.events = this.service.events;
    this.showEvent = true;
    this.showEventFiltered = false;
    this.list = this.events;
    for (let key in this.list) {
      let dateAux = new Date(this.list[key].date);
      if(this.month == dateAux.getMonth() && this.list[key].sold == true){
        let item = {
          date: this.list[key].date,
          startTime: this.list[key].startTime,
          endTime: this.list[key].endTime,
          doctor: this.list[key].doctor,
          price: this.list[key].price,
          patient: this.list[key].patient,
          sold:this.list[key].sold,
          key: key,
        };
        listMonth.push(item);
      }
    }
    let cash:number = 0;
    let doc;
    for(let item of listMonth){
      if(this.exist(item)==false){
        for(let itemAux of listMonth){
          if(item.doctor == itemAux.doctor){
            cash += Number(itemAux.price);
          }
          doc={
            doctor: item.doctor,
            total: cash
          }
        }
        if (this.exist(item)==false) {
          this.eventsList.push(doc);
        }
        cash = 0;
      }
    }
  }
}
