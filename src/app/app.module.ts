import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CalendarComponent } from "./components/calendar.component";

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [CalendarComponent,AppComponent]
})
export class AppModule { }
