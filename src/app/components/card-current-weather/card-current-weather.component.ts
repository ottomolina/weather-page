import { Component, Input } from '@angular/core';
import { Current, CurrentUnits } from 'src/app/models/weater.model';

@Component({
  selector: 'app-card-current-weather',
  templateUrl: './card-current-weather.component.html',
  styleUrls: ['./card-current-weather.component.scss']
})
export class CardCurrentWeatherComponent {
  @Input() citySelected: string = '';
  @Input() hour: string = '';
  @Input() dayOfWeek: string = '';
  @Input() currentUnits: CurrentUnits;
  @Input() currentWeather: Current;
}
