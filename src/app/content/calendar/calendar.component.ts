import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  defaultImage = '';
  errorImage = '';
  photo = 'http://www.elcomercio.com/files/article_main/uploads/2017/05/12/5916775bc3359.jpeg';
  constructor() { }

  ngOnInit() {

  }

}
