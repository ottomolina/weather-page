import { Component, Input } from '@angular/core';
import { HourlyWeather } from 'src/app/models/hourly-weather.model';
import { HourlyUnits } from 'src/app/models/weater.model';

@Component({
  selector: 'app-item-hour-weather',
  templateUrl: './item-hour-weather.component.html',
  styleUrls: ['./item-hour-weather.component.scss']
})
export class ItemHourWeatherComponent {
  @Input() public hourlyWeather: HourlyWeather;
  @Input() public hourlyUnits: HourlyUnits;

}
