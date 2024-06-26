import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherCodeIcon'
})
export class WeatherCodeIconPipe implements PipeTransform {

  transform(value: number, isDay: number = 1): string {
    const isDayBool = isDay === 1;
    let tipoClima = 'assets/icon/';
    if (value === 0) {
      tipoClima += isDayBool ? 'day' : 'night';
    } else if ([1, 2, 3].findIndex(e => e === value) > -1) {
      tipoClima += isDayBool ? 'cloudy-day-1' : 'cloudy-night-1';
    } else if ([45, 48].findIndex(e => e === value) > -1) {
      tipoClima += 'cloudy';
    } else if ([51, 53, 55].findIndex(e => e === value) > -1) {
      tipoClima += 'rainy-4';
    } else if ([56, 57].findIndex(e => e === value) > -1) {
      tipoClima += 'snowy-4';
    } else if ([61, 63, 65].findIndex(e => e === value) > -1) {
      tipoClima += 'rainy-5';
    } else if ([66, 67].findIndex(e => e === value) > -1) {
      tipoClima += 'rainy-7';
    } else if ([71, 73, 75].findIndex(e => e === value) > -1) {
      tipoClima += 'snowy-5';
    } else if ([80, 81, 82].findIndex(e => e === value) > -1) {
      tipoClima += 'rainy-6';
    } else if ([77, 85, 86].findIndex(e => e === value) > -1) {
      tipoClima += 'snowy-6';
    } else if ([95, 96, 99].findIndex(e => e === value) > -1) {
      tipoClima += 'thunder';
    }
    tipoClima += '.svg';
    return tipoClima;
  }

}
