import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemHourWeatherComponent } from './item-hour-weather.component';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    ItemHourWeatherComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    ItemHourWeatherComponent
  ],
})
export class ItemHourWeatherModule { }
