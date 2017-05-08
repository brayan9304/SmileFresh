import {Component} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {EventCalendar} from "./event-date";

declare var jQuery: any;
declare var moment: any;
declare var firebase: any;

@Component({
  selector: 'app-calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  database = firebase.database();
  firebaseService: FirebaseService;
  eventData: EventCalendar;
  keyEventData;

  constructor(firebaseService: FirebaseService) {
    let arrayEvents = [];
    let list;
    let event;
    this.firebaseService = firebaseService;
    this.eventData = {
      date: '',
      startTime: '',
      endTime: '',
      doctor: '',
      price: '',
      patient: ''
    };

    const eventsRef = this.database.ref('events');
    jQuery(document).ready((e) => {
      eventsRef.on('value', function (snapshot) {
        arrayEvents = [];
        list = snapshot.val();
        for (let key in list) {
          event = {
            title: list[key].patient,
            start: list[key].date + "T" + list[key].startTime,
            end: list[key].date + "T" + list[key].endTime,
            doctor: list[key].doctor,
            price: list[key].price,
            eventKey: key
          };
          arrayEvents.push(event);
        }
        setCalendar(arrayEvents);
      });

      eventsRef.on('child_changed', function(data) {
        let eventUpdated = data.val();
        setMainEvent(eventUpdated);
        window.location.reload();
      });

      var setDate = (date) => {
        this.eventData.date = date;
      };
      var setEvent = (event) => {
        let startDate = moment(event.start).format();
        let endDate = moment(event.end).format();
        startDate = startDate.split('T');
        endDate = endDate.split('T');
        this.keyEventData = event.eventKey;
        this.eventData.date = startDate[0];
        this.eventData.startTime = startDate[1];
        this.eventData.endTime = endDate[1];
        this.eventData.price = event.price;
        this.eventData.doctor = event.doctor;
        this.eventData.patient = event.title;
      };
      var restore = () => {
        this.eventData.startTime = '';
        this.eventData.endTime = '';
        this.eventData.price = '';
        this.eventData.doctor = '';
        this.eventData.patient = '';
      };
      var getMainEvent = () => {
        return this.eventData;
      };

      var setMainEvent = (event) => {
        return this.eventData = event;
      };
      // page is now ready, initialize the calendar...
      function setCalendar(events: object) {
        jQuery('#calendar').fullCalendar({
          header: {
            left: 'prev,next,today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          navLinks: true, // can click day/week names to navigate views
          selectable: true,
          selectHelper: true,
          select: function (start, end) {
            jQuery('h4#myModalLabel').text('New Date');
            jQuery('button#submit').show();
            jQuery('button#edit').hide();
            jQuery('#add_event_modal').modal();
            restore();
            setDate(moment(start).format());
            console.log(this.eventData);
            jQuery('#calendar').fullCalendar('unselect');
          },
          editable: true,
          eventLimit: true, // allow "more" link when too many events
          events: events,
          eventClick: function (event) {
            setEvent(event);
            console.log(event);
            jQuery('h4#myModalLabel').text('Edit Appointment');
            jQuery('button#submit').hide();
            jQuery('button#edit').show();
            jQuery('#add_event_modal').modal();
            let mainEvent=getMainEvent();
            console.log(mainEvent);
            jQuery('#calendar').fullCalendar('updateEvent', event);
          }
        });
      }
    });
  }
  edit() {
    this.firebaseService.editEvent(this.keyEventData, this.eventData, this.database);
  }
  onSubmit() {
    let eventRender = {
      start: this.eventData.date + "T" + this.eventData.startTime,
      end: this.eventData.date + "T" + this.eventData.endTime,
      title: this.eventData.patient,
      doctor: this.eventData.doctor,
      price: this.eventData.price
    };
    this.firebaseService.saveEvent(this.eventData, this.database);
    jQuery('#calendar').fullCalendar('renderEvent', eventRender, true);
  }
}
