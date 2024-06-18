import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: number, decimal: 0|2 = 0): string {
    return Number(value).toFixed(decimal);
  }

}
