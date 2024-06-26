import { Component } from '@angular/core';
import { LocationService } from './services/location/location.service';
import { firstValueFrom } from 'rxjs';
import { SessionstorageService } from './services/storage/sessionstorage.service';
import { Place } from './models/place.model';
import { Weather } from './models/weater.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { DailyWeather } from './models/daily-weather.model';
import { HourlyWeather } from './models/hourly-weather.model';

const TRIGGER_BUSCAR = 750;
const nameDays = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

interface LinkRange {
  text: string;
  active: boolean;
  code: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private refTimeout: any;
  public listPlaces: Array<Place> = [];
  public listDailyWeather: Array<DailyWeather> = [];
  public listHourlyWeather: Array<HourlyWeather> = [];

  // Variables for div-current-weather
  public citySelected: string = '';
  public hour: string = '';
  public dayOfWeek: string = '';
  public weather: Weather;
  public isLoading: boolean = true;
  public linksRange: Array<LinkRange> = [];

  public nameDaySelected: string = '';
  public dateSelected: string = '';
  public hidePrev: boolean = true;
  public hideNext: boolean = false;

  constructor(
    private locationService: LocationService,
    private sessionStorage: SessionstorageService,
    private spinner: NgxSpinnerService
  ) {
    this.linksRange.push({ text: 'El tiempo 1 - 7 días', active: true, code: 0 });
    this.linksRange.push({ text: '8 - 14 días', active: false, code: 7 });
    this.getCountryFromIp();
  }

  public async getCountryFromIp() {
    try {
      this.spinner.show();
      const ipObject = await firstValueFrom(this.locationService.getIpAddress())
      this.sessionStorage.ipAddressExternal = ipObject.ip;
      const countryObject = await firstValueFrom(this.locationService.getCountryFromIpAddress(ipObject.ip));
      this.sessionStorage.countryIpAddressExternal = countryObject.country;

      await this.searchingProcess(countryObject.country);
      const place = this.listPlaces.find(e => e.name === countryObject.country);
      place && await this.selectResult(place);
      
    } catch(error) {
      console.error('error', error);
      alert('Ocurrió un inconveniente al realizar esta acción.');
    } finally {
      this.spinner.hide();
    }
  }

  search(event: any) {
    clearTimeout(this.refTimeout);
    this.refTimeout = setTimeout(() => {
      if(event.trim() === '') {
        return;
      }
      this.searchingProcess(event);
    }, TRIGGER_BUSCAR);
  }

  async searchingProcess(place: string) {
    let list = await firstValueFrom(this.locationService.getListPlaces(place));
    this.listPlaces = [];
    list = list.filter((item:Place, index:number) => {
      return list.findIndex(e => e.display_name === item.display_name) === index;
    });
    this.listPlaces = list;
    this.listPlaces = [
      ...this.listPlaces.filter(e => e.display_name.toLocaleLowerCase().includes(this.sessionStorage.countryIpAddressExternal.toLocaleLowerCase())),
      ...this.listPlaces.filter(e => !e.display_name.toLocaleLowerCase().includes(this.sessionStorage.countryIpAddressExternal.toLocaleLowerCase()))
    ]
  }

  public async selectResult(item:Place) {
    try {
      this.isLoading = true;
      this.spinner.show();
      this.citySelected = item.name;
      this.hour = this.getHour();
      this.dayOfWeek = nameDays[new Date().getDay()];
      
      this.weather = await firstValueFrom(this.locationService.getWeatherByCoords(item.lat, item.lon));
      // this.mapHourlyWeather.clear();
      this.showRangeDaysWeather(0, 7);

    } catch(error) {
      console.error('error', error);
      alert('Ocurrió un inconveniente al realizar esta acción.');
    } finally {
      this.isLoading = false;
      this.spinner.hide();
    }
  }

  public showRangeDaysWeather(initial: number, final: number) {
    this.hidePrev = initial === 0;
    this.hideNext = initial !== 0;
    this.listDailyWeather = [];
    const daily = this.weather.daily;
    let i = initial;
    while(i < final) {
      const item: DailyWeather = {
        nameDay: this.getNameDay(daily.time[i]),
        date: this.getDate(daily.time[i]),
        precipitation_sum: daily.precipitation_sum[i],
        precipitation_probability_max: daily.precipitation_probability_max[i],
        weather_code: daily.weather_code[i],
        temperature_2m_max: daily.temperature_2m_max[i],
        temperature_2m_min: daily.temperature_2m_min[i],
        active: i === initial,
        time: daily.time[i],
        sunrise: daily.sunrise[i],
        sunset: daily.sunset[i],
      };
      this.listDailyWeather.push(item);
      i++;
    }
    this.clickDay(this.listDailyWeather[0]);
  }

  public clickRange(item: LinkRange) {
    if(item.active) {
      return;
    }
    this.linksRange.filter(e => e.active)[0].active = false;
    item.active = true;
    this.showRangeDaysWeather(item.code, (item.code+7));
  }

  public clickButtonPrevNext(index:number) {
    const item = this.linksRange[index];
    this.clickRange(item);
  }

  private getHour() {
    const date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();

    let ret = hour < 10 ? `0${hour}` : `${hour}`;
    ret += ':' + (minute < 10 ? `0${minute}` : minute);
    return ret;
  }

  public getNameDay(time: string) {
    if(time === this.getCurrentDate()) {
      return 'Hoy';
    }
    if(time === this.getCurrentDate(1)) {
      return 'Mañana';
    }
    const date = new Date(new Date(`${time}T00:00:00`).toLocaleString('en-US',{timeZone:'America/Guatemala'}));
    return nameDays[date.getDay()];
  }

  private getDate(time: string) {
    const date = new Date(`${time}T00:00:00`);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  }
  
  public getCurrentDate(sumDay: number = 0): string {
    const date = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Guatemala'}));
    const day = `${date.getDate()+sumDay}`.padStart(2, '0');
    const month = date.getMonth() < 9 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`;
    const year = `${date.getFullYear()}`;
    return `${year}-${month}-${day}`;
  }

  public clickDay(itemSelected: DailyWeather) {
    this.listDailyWeather.forEach(e => e.active = false);
    itemSelected.active = true;
    
    const date = itemSelected.time;
    this.nameDaySelected = this.getNameDay(date);
    const dateTemp = new Date(`${date}T00:00:00`);
    const day = dateTemp.getDate();
    const month = dateTemp.toLocaleString('default', { month: 'long' });
    this.dateSelected = `${day} de ${month}`
    this.listHourlyWeather = [];
    
    const final = this.weather.hourly.time.length;
    let i = 0;
    while(i < final) {
      const { time, temperature_2m, apparent_temperature, wind_speed_10m, wind_gusts_10m, relative_humidity_2m,
        wind_direction_10m, precipitation, precipitation_probability, weather_code } = this.weather.hourly;
      const timeElement = time[i].split('T');
      if(timeElement[0] === date) {
        const item: HourlyWeather = {
          time: timeElement[1],
          temperature_2m: temperature_2m[i],
          apparent_temperature: apparent_temperature[i],
          wind_speed_10m: wind_speed_10m[i],
          wind_gusts_10m: wind_gusts_10m[i],
          wind_direction_10m: wind_direction_10m[i],
          relative_humidity_2m: relative_humidity_2m[i],
          precipitation: precipitation[i],
          precipitation_probability: precipitation_probability[i],
          weather_code: weather_code[i],
          isDay: new Date(time[i]) > new Date(itemSelected.sunrise) && new Date(time[i]) < new Date(itemSelected.sunset) ? 1 : 0
        }
        this.listHourlyWeather.push(item);
      }
      i++;
    }
  }

}
