import {Component} from '@angular/core';
import {FirebaseListObservable} from 'angularfire2';
import {FirebaseService} from '../../services/firebase.service';
import {CalendarComponent} from 'ap-angular2-fullcalendar/src/calendar/calendar';





@Component({
  selector: 'calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CustomCalendarComponent {
  events: FirebaseListObservable<any>;
  calendarOptions: Object = {
    height: 'parent',
    fixedWeekCount : false,
    defaultDate: '2016-09-12',
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: [
      {
        title: 'All Day Event',
        start: '2016-09-01'
      },
      {
        title: 'Long Event',
        start: '2016-09-07',
        end: '2016-09-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-09T16:00:00'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2016-09-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2016-09-11',
        end: '2016-09-13'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T10:30:00',
        end: '2016-09-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2016-09-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2016-09-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: '2016-09-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: '2016-09-12T20:00:00'
      },
      {
        title: 'Birthday Party',
        start: '2016-09-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2016-09-28'
      }
    ]
  };
  constructor(private firebaseService: FirebaseService) {
    let arrayEvents = [];
    let event;
    jQuery(document).ready(function () {
      firebaseService.getEvents().subscribe(events => {
        this.events = events;
        for (let key in this.events) {
          event = {
            title: this.events[key].title,
            start: this.events[key].start
          };
          arrayEvents.push(event);
        }
      });
    });
  }
}




