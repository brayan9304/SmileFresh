import {Component} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';


declare var jQuery: any;
declare var moment: any;
declare var firebase: any;
@Component({
  selector: 'app-calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {


  onSubmit() {
    console.log("bitch");
  }

  constructor(private firebaseService: FirebaseService) {
    const database = firebase.database();
    const eventsRef = database.ref('events');
    let arrayEvents = [];
    let event;
    let list;

    jQuery(document).ready(function () {
      eventsRef.on('value', function (snapshot) {
        list = snapshot.val();
        for (let key in list) {
          event = {
            title: list[key].title,
            start: list[key].start,
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
            jQuery('#add_event_modal').modal();
            /*let title = prompt('Patient Name: ');
            let eventData;
            if (title) {
              eventData = {
                title: title,
                start: moment(start).format(),
                end: end
              };
              firebaseService.saveEvent(eventData, database);
              jQuery('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
            }*/
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

      // page is now ready, initialize the calendar...
    });
  }
}
