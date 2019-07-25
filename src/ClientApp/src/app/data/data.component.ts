import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data',
  template: `
<app-exchange-rate apiUrl="rates"></app-exchange-rate>
  `,
  styles: []
})
export class DataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
