import { NgModule } from '@angular/core';
import { WeatherCodePipe } from './weather-code.pipe';
import { FormatNumberPipe } from './format-number.pipe';

@NgModule({
    declarations: [
        WeatherCodePipe,
        FormatNumberPipe
    ],
    exports: [
        WeatherCodePipe,
        FormatNumberPipe
    ],
})

export class PipesModule {}