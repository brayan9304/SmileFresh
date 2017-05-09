import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {EventCalendar} from "../event-date";

declare var jQuery: any;
declare var moment: any;
declare var firebase: any;

@Component({
  selector: 'app-calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  database = firebase.database();
  firebaseService: FirebaseService;
  eventData: EventCalendar;
  patients;
  doctors;
  days=['Monday','Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  doctors_available =[];
  keyEventData;

  constructor(firebaseService: FirebaseService) {
    this.firebaseService = firebaseService;
  }

  ngOnInit(){
    let arrayEvents = [];
    let arrayPatients = [];
    let arrayDoctors = [];
    let list;
    let event;
    this.eventData = {
      date: '',
      startTime: '',
      endTime: '',
      doctor: '',
      price: '',
      patient: '',
      sold:false
    };

    const eventsRef = this.database.ref('events');
    const patientsRef = this.database.ref('patients');
    const doctorsRef = this.database.ref('doctors');
    jQuery(document).ready((e) => {
      var setPatients = (arrayPatients) => {
        this.patients = arrayPatients;
      };
      var setDoctors = (arrayDoctors) => {
        this.doctors = arrayDoctors;
        console.log(this.doctors);
      };
      eventsRef.on('value', function (snapshot) {
        arrayEvents = [];
        list = snapshot.val();
        for (let key in list) {
          event = {
            title: list[key].patient,
            start: list[key].date + "T" + list[key].startTime,
            end: list[key].date + "T" + list[key].endTime,
            doctor: list[key].eventData,
            price: list[key].price,
            eventKey: key
          };
          arrayEvents.push(event);
        }
       setCalendar(arrayEvents);
      });

      patientsRef.on('value', function (snapshot) {
        list = snapshot.val();
        let patient;
        for (let key in list) {
          patient = {
            firstName: list[key].firstName,
            lastName: list[key].lastName
          };
          arrayPatients.push(patient);
        }
        setPatients(arrayPatients);
      });

      doctorsRef.on('value', function (snapshot) {
        list = snapshot.val();
        let doctor;
        for (let key in list) {
          doctor = {
            firstName: list[key].firstName,
            lastName: list[key].lastName,
            workingDays: list[key].workingDays
          };
          arrayDoctors.push(doctor);
        }
        setDoctors(arrayDoctors);
      });

      eventsRef.on('child_changed', function(data) {
        let eventUpdated = data.val();
        setMainEvent(eventUpdated);
        window.location.reload();
      });

      var doctorsAvailable = (date) => {
        let currentlyDate = new Date(date);
        let dayNumber = currentlyDate.getDay();
        let dayStr = this.days[dayNumber];
        this.doctors_available = [];
        for (let doctor of this.doctors){
          let workingDays = doctor.workingDays;
            for(let days of workingDays){
              if(dayStr == days ){
                this.doctors_available.push(doctor);
              }
            }
        }
      };

      var setDate = (date) => {
        this.eventData.date = date;
        doctorsAvailable(this.eventData.date );
      };
      var setEvent = (event) => {
        let startDate = moment(event.start).format();
        let endDate = moment(event.end).format();
        startDate = startDate.split('T');
        endDate = endDate.split('T');
        this.keyEventData = event.eventKey;
        this.eventData.date = startDate[0];
        doctorsAvailable(this.eventData.date );
        this.eventData.startTime = startDate[1];
        this.eventData.endTime = endDate[1];
        this.eventData.price = event.price;
        this.eventData.doctor = event.doctor;
        this.eventData.patient = event.title;
        activateLoader();
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
      var activateLoader = () => {
       jQuery('.loader').css('display', 'block');
        var refreshIntervalId = setInterval(() =>{
          if(jQuery('select#patient-select').val() != ''){
            jQuery('.loader').css('display', 'none');
            clearInterval(refreshIntervalId);
          }
        }, 1000);
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
            if(jQuery('select#patient-select').val() != ''){
              jQuery('.loader').css('display', 'none');
            }
            jQuery('h4#myModalLabel').text('New Date');
            jQuery('button#submit').show();
            jQuery('button#edit').hide();
            jQuery('#add_event_modal').modal();
            restore();
            setDate(moment(start).format());
            jQuery('#calendar').fullCalendar('unselect');
          },
          eventStartEditable: false,
          editable: true,
          eventLimit: true, // allow "more" link when too many events
          events: events,
          eventClick: function (event) {
            setEvent(event);
            jQuery('h4#myModalLabel').text('Edit Appointment');
            jQuery('button#submit').hide();
            jQuery('button#edit').show();
            jQuery('#add_event_modal').modal();
            let mainEvent= getMainEvent();
            jQuery('#calendar').fullCalendar('updateEvent', event);
          }
        });
      }
    });
  }
  edit() {
    this.firebaseService.editEvent(this.keyEventData, this.eventData);
  }
  onSubmit() {
    let eventRender = {
      start: this.eventData.date + "T" + this.eventData.startTime,
      end: this.eventData.date + "T" + this.eventData.endTime,
      title: this.eventData.patient,
      doctor: this.eventData.doctor,
      price: this.eventData.price
    };
    if(this.eventData.patient != '' &&  this.eventData.doctor != '') {
      this.firebaseService.saveEvent(this.eventData);
      jQuery('#calendar').fullCalendar('renderEvent', eventRender, true);
    }else{
      alert('Empty Fields');
    }
  }
}
