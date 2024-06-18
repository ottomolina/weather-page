import { Component } from '@angular/core';
import { LocationService } from './services/location/location.service';
import { firstValueFrom } from 'rxjs';
import { SessionstorageService } from './services/storage/sessionstorage.service';
import { Place } from './models/place.model';
import { Weather } from './models/weater.model';
import { NgxSpinnerService } from 'ngx-spinner';

const TRIGGER_BUSCAR = 750;
const nameDays = [ 'Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo' ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private refTimeout: any;
  public listPlaces: Array<Place> = [];

  // Variables for div-current-weather
  public citySelected: string = '';
  public hour: string = '';
  public dayOfWeek: string = '';
  public weather: Weather;
  public isLoading: boolean = true;

  constructor(
    private locationService: LocationService,
    private sessionStorage: SessionstorageService,
    private spinner: NgxSpinnerService
  ) {
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
      this.dayOfWeek = nameDays[new Date().getDay()-1];
      
      this.weather = await firstValueFrom(this.locationService.getWeatherByCoords(item.lat, item.lon));
    } catch(error) {
      console.error('error', error);
      alert('Ocurrió un inconveniente al realizar esta acción.');
    } finally {
      this.isLoading = false;
      this.spinner.hide();
    }
  }

  private getHour() {
    const date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();

    let ret = hour < 10 ? `0${hour}` : `${hour}`;
    ret += ':' + (minute < 10 ? `0${minute}` : minute);
    return ret;
  }

}
