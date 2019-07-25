import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DataComponent } from './data/data.component';
import { ApiAuthorizationModule } from "./api-authorization/api-authorization.module";
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { AuthorizeInterceptor } from "./api-authorization/authorize.interceptor";
import { InternalDataComponent } from './internal-data/internal-data.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataComponent,
    ExchangeRateComponent,
    InternalDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApiAuthorizationModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }],

  bootstrap: [AppComponent]
})
export class AppModule { }
