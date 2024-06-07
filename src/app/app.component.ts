import { Component } from '@angular/core';
import { LocationService } from './services/location/location.service';
import { firstValueFrom } from 'rxjs';
import { SessionstorageService } from './services/storage/sessionstorage.service';
import { Place } from './models/place.model';

const TRIGGER_BUSCAR = 750;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private refTimeout: any;
  title = 'web-weather';
  public listPlaces: Array<Place> = [];

  constructor(
    private locationService: LocationService,
    private sessionStorage: SessionstorageService
  ) {
    this.getCountryFromIp();
  }

  public async getCountryFromIp() {
    try {
      const ipObject = await firstValueFrom(this.locationService.getIpAddress())
      this.sessionStorage.ipAddressExternal = ipObject.ip;
      const countryObject = await firstValueFrom(this.locationService.getCountryFromIpAddress(ipObject.ip));
      this.sessionStorage.countryIpAddressExternal = countryObject.country;
    } catch(error) {
      console.error('error', error);
    }
  }

  name = '';

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

  public selectResult(item:Place) {
    console.log('itemSelected', item);
  }
}
