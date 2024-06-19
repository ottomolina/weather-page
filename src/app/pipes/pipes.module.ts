import { NgModule } from '@angular/core';
import { WeatherCodePipe } from './weather-code.pipe';
import { FormatNumberPipe } from './format-number.pipe';
import { WeatherCodeIconPipe } from './weather-code-icon.pipe';

@NgModule({
    declarations: [
        WeatherCodePipe,
        FormatNumberPipe,
        WeatherCodeIconPipe
    ],
    exports: [
        WeatherCodePipe,
        FormatNumberPipe,
        WeatherCodeIconPipe
    ],
})

export class PipesModule {}