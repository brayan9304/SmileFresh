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
  constructor(firebaseService: FirebaseService) {
    let arrayEvents = [];
    let list;
    let event;
    this.firebaseService = firebaseService;
    this.eventData={
      patient:'',
      start:''
    };

    const eventsRef = this.database.ref('events');
    jQuery(document).ready((e) => {
      eventsRef.on('value', function (snapshot) {
        list = snapshot.val();
        for (let key in list) {
         event ={
            //id_doctor:1,
            title:list[key].patient,
            start:list[key].start
          };
          arrayEvents.push(event);
        }
        setCalendar(arrayEvents);
      });

      var setDate = (date)=>{
        this.eventData.start = date;
        console.log(this.eventData.start);
      }
      // page is now ready, initialize the calendar...
      function setCalendar(events: object) {
        jQuery('#calendar').fullCalendar({
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          navLinks: true, // can click day/week names to navigate views
          selectable: true,
          selectHelper: true,
          select: function (start, end) {
            jQuery('#add_event_modal').modal();
            setDate(moment(start).format());
            jQuery('#calendar').fullCalendar('unselect');
          },
          editable: true,
          eventLimit: true, // allow "more" link when too many events
          events: events,
          eventClick: function (event) {
            event.title = prompt('Patient Name: ');
            if (event.title) {
              jQuery('#calendar').fullCalendar('updateEvent', event);
            }
          }
        });
      }
    });
  }
  onSubmit() {
    this.firebaseService.saveEvent(this.eventData, this.database);
    jQuery('#calendar').fullCalendar('renderEvent', this.eventData, true);
  }
}
