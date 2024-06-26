import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'windDirection'
})
export class WindDirectionPipe implements PipeTransform {

  transform(value: number): string {
    let direction = '';
    if(value === 360) {
      direction = 'Norte';
    } else if(value > 0 && value < 90) {
      direction = 'Noreste';
    } else if(value === 90) {
      direction = 'Este';
    } else if(value > 90 && value < 180) {
      direction = 'Sureste';
    } else if(value === 180) {
      direction = 'Sur';
    } else if(value > 180 && value < 270) {
      direction = 'Suroeste';
    } else if(value === 270) {
      direction = 'Oeste';
    } else if(value > 270 && value < 360) {
      direction = 'Noroeste';
    }
    return direction;
  }

}
