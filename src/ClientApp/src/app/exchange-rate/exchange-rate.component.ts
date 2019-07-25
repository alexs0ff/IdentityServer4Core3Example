import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-exchange-rate',
  template: `
<div class="alert alert-danger" *ngIf="errorMessage | async as msg">
  {{msg}}
</div>
<table class='table table-striped'>
  <thead>
  <tr>
    <th>From currency</th>
    <th>To currency</th>
    <th>Rate</th>    
  </tr>
  </thead>
  <tbody>
  <tr *ngFor="let rate of rates | async">
    <td>{{ rate.fromCurrency }} </td>
    <td>{{ rate.toCurrency }}</td>
    <td>{{ rate.value }}</td>
  </tr>
  </tbody>
</table>

  `,
  styles: []
})
export class ExchangeRateComponent implements OnInit {
  public rates: Observable<ExchangeRateItem[]>;

  public errorMessage: Subject<string>;

  @Input() public apiUrl: string;

  constructor(private http: HttpClient) {
    this.errorMessage = new Subject<string>();
  }

  ngOnInit() {
    this.rates = this.http.get<ExchangeRateItem[]>("/api/" + this.apiUrl).pipe(catchError(this.handleError(this.errorMessage)));
  }

  private handleError(subject: Subject<string>): (te: any) => Observable<ExchangeRateItem[]> {
    return (error) => {
      let message = '';
      if (error.error instanceof ErrorEvent) {
        message = `Error: ${error.error.message}`;
      } else {
        message = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      subject.next(message);
      let emptyResult: ExchangeRateItem[] = [];
      return of(emptyResult);
    }
  }
}

interface ExchangeRateItem {
  fromCurrency: string;
  toCurrency: string;
  value: number;
}
