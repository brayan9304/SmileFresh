import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'payment-component',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit() {

  }
}
