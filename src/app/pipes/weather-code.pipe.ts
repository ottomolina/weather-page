import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherCode'
})
export class WeatherCodePipe implements PipeTransform {

  transform(value: number): string {
    let tipoClima = '';
    if (value === 0) {
      tipoClima = 'Despejado';
    } else if ([1, 2, 3].findIndex(e => e === value) > -1) {
      tipoClima = 'Parcialmente nublado';
    } else if ([45, 48].findIndex(e => e === value) > -1) {
      tipoClima = 'Niebla';
    } else if ([51, 53, 55].findIndex(e => e === value) > -1) {
      tipoClima = 'Llovizna';
    } else if ([56, 57].findIndex(e => e === value) > -1) {
      tipoClima = 'Llovizna helada';
    } else if ([61, 63, 65].findIndex(e => e === value) > -1) {
      tipoClima = 'Lluvia';
    } else if ([66, 67].findIndex(e => e === value) > -1) {
      tipoClima = 'Lluvia helada';
    } else if ([71, 73, 75].findIndex(e => e === value) > -1) {
      tipoClima = 'Caída de nieve';
    } else if (value === 77) {
      tipoClima = 'Granizo';
    } else if ([80, 81, 82].findIndex(e => e === value) > -1) {
      tipoClima = 'Chubascos de lluvia';
    } else if ([85, 86].findIndex(e => e === value) > -1) {
      tipoClima = 'Chubascos de nieve';
    } else if (value === 95) {
      tipoClima = 'Tormenta';
    } else if ([96, 99].findIndex(e => e === value) > -1) {
      tipoClima = 'Tormenta con granizo';
    }
    return tipoClima;
  }

}
