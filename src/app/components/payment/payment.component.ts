import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {EventCalendar} from "../event-date";

declare var firebase: any;

@Component({
  selector: 'payment-component',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
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

  showEvents() {
    console.log('showEvents');
    //this.addDoctorCont += 1;
    this.service.getEventsList();
    this.events = this.service.events;
    this.showEvent = true;
    this.showEventFiltered = false;
    this.list = this.events;
    for (let key in this.list) {
      if(!this.list[key].sold){
        let item = {
          date: this.list[key].date,
          startTime: this.list[key].startTime,
          endTime: this.list[key].endTime,
          doctor: this.list[key].doctor,
          price: this.list[key].price,
          patient: this.list[key].patient,
          sold:this.list[key].sold,
          key: key
        };
        this.eventsList.push(item);
      }
    }
  }
  setSold(key,event){
    this.item = {
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      doctor: event.doctor,
      price: event.price,
      patient: event.patient,
      sold:true
    };
  this.service.editEvent(key,this.item);
  location.reload();
  }

}
