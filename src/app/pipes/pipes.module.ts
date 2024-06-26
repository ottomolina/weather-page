import { NgModule } from '@angular/core';
import { WeatherCodePipe } from './weather-code.pipe';
import { FormatNumberPipe } from './format-number.pipe';
import { WeatherCodeIconPipe } from './weather-code-icon.pipe';
import { WindDirectionIconPipe } from './wind-direction-icon.pipe';
import { WindDirectionPipe } from './wind-direction.pipe';

@NgModule({
    declarations: [
        WeatherCodePipe,
        FormatNumberPipe,
        WeatherCodeIconPipe,
        WindDirectionIconPipe,
        WindDirectionPipe
    ],
    exports: [
        WeatherCodePipe,
        FormatNumberPipe,
        WeatherCodeIconPipe,
        WindDirectionIconPipe,
        WindDirectionPipe
    ],
})

export class PipesModule {}