import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  clicked() {
  	jQuery("#sidebar").toggleClass("active");
    jQuery(".app-container").toggleClass("__sidebar");
    console.log("hola");
  }
}
