import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-data',
  template: `<app-exchange-rate apiUrl="internalrates"></app-exchange-rate>`,
  styles: []
})
export class InternalDataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
