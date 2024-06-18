import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCurrentWeatherComponent } from './card-current-weather.component';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    CardCurrentWeatherComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    CardCurrentWeatherComponent
  ]
})
export class CardCurrentWeatherModule { }
