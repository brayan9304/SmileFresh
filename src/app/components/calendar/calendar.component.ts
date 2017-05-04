import {Component, ElementRef, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {FirebaseService} from '../../services/firebase.service';


declare var jQuery: any;
declare var moment: any;


@Component({
  selector: 'calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  events: FirebaseListObservable<any>;

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
        setCalendar(arrayEvents);
      });

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
            let title = prompt('Patient Name: ');
            let eventData;
            if (title) {
              eventData = {
                title: title,
                start: moment(start).format(),
                end: end
              };
              firebaseService.saveEvent(eventData);
              jQuery('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
            }
            jQuery('#calendar').fullCalendar('unselect');
          },
          editable: true,
          eventLimit: true, // allow "more" link when too many events
          events: arrayEvents,
          eventClick: function (event) {
            event.title = prompt('Patient Name: ');
            if (event.title) {
              jQuery('#calendar').fullCalendar('updateEvent', event);
            }
          }
        });
      }
      // page is now ready, initialize the calendar...
    });
  }
}
