import { Component, Input } from '@angular/core';
import { DailyWeather } from 'src/app/models/daily-weather.model';
import { DailyUnits } from 'src/app/models/weater.model';

@Component({
  selector: 'app-card-day-weather',
  templateUrl: './card-day-weather.component.html',
  styleUrls: ['./card-day-weather.component.scss']
})
export class CardDayWeatherComponent {
  @Input() public dailyWeather: DailyWeather;
  @Input() public dailyUnits: DailyUnits;
}
