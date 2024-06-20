import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderModule } from './components/header/header.module';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CardCurrentWeatherModule } from './components/card-current-weather/card-current-weather.module';
import { CardDayWeatherModule } from './components/card-day-weather/card-day-weather.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderModule,
    HttpClientModule,
    FormsModule,
    HeaderModule,
    NgxSpinnerModule,
    CardCurrentWeatherModule,
    CardDayWeatherModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
