import { Component, OnInit } from '@angular/core';
import {Doctor} from '../doctor';
import {FirebaseService} from '../../services/firebase.service';

declare var firebase: any;

@Component({
  selector: 'app-doctors',
  templateUrl: 'doctors.component.html',
  styleUrls: ['doctors.component.css']
})

export class DoctorsComponent implements OnInit {
  service: FirebaseService;
  database: any;
  myDoctor = new Doctor;

  constructor(firebaseService: FirebaseService) {
    this.service = firebaseService;
    this.database = firebase.database();
    $('.summary-errors').hide();

    $('#addDoctor').formValidation({
      framework: "bootstrap4",
      button: {
        selector: '#validateButton3',
        disabled: 'disabled'
      },
      icon: null,
      err: {
        clazz: 'text-help'
      },
      row: {
        invalid: 'has-danger'
      },
      fields: {
        summary_fullName: {
          validators: {
            notEmpty: {
              message: 'The full name is required and cannot be empty'
            }
          }
        },
        summary_email: {
          validators: {
            notEmpty: {
              message: 'The email address is required and cannot be empty'
            },
            emailAddress: {
              message: 'The email address is not valid'
            }
          }
        },
        summary_content: {
          validators: {
            notEmpty: {
              message: 'The content is required and cannot be empty'
            },
            stringLength: {
              max: 500,
              message: 'The content must be less than 500 characters long'
            }
          }
        }
      }
    })

    .on('success.form.fv', function(e) {
      // Reset the message element when the form is valid
      $('.summary-errors').html('');
    })

    .on('err.field.fv', function(e, data) {
      // data.fv     --> The FormValidation instance
      // data.field  --> The field name
      // data.element --> The field element
      $('.summary-errors').show();

      // Get the messages of field
      var messages = data.fv.getMessages(data.element);

      // Remove the field messages if they're already available
      $('.summary-errors').find('li[data-field="' + data.field + '"]').remove();

      // Loop over the messages
      for (var i in messages) {
        // Create new 'li' element to show the message
        $('<li/>')
          .attr('data-field', data.field)
          .wrapInner(
            $('<a/>')
            .attr('href', 'javascript: void(0);')
            // .addClass('alert alert-danger alert-dismissible')
            .html(messages[i])
            .on('click', function(e) {
              // Focus on the invalid field
              data.element.focus();
            })
          ).appendTo('.summary-errors > ul');
      }

      // Hide the default message
      // $field.data('fv.messages') returns the default element containing the messages
      data.element
        .data('fv.messages')
        .find('.text-help[data-fv-for="' + data.field + '"]')
        .hide();
    })

    .on('success.field.fv', function(e, data) {
      // Remove the field messages
      $('.summary-errors > ul').find('li[data-field="' + data.field + '"]').remove();
      if ($('#exampleSummaryForm').data('formValidation').isValid()) {
        $('.summary-errors').hide();
      }
    });
  }

  addDoctor(){
    this.service.saveDoctor(this.myDoctor, this.database);
  }

  ngOnInit() {
  }

}