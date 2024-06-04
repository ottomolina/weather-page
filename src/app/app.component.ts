import { Component } from '@angular/core';
import { IpLocationService } from './services/ip-location/ip-location.service';
import { firstValueFrom } from 'rxjs';
import { IpExternal } from './models/ip-external.model';
import { SessionstorageService } from './services/storage/sessionstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-weather';

  constructor(
    private ipLocationService: IpLocationService,
    private sessionStorage: SessionstorageService
  ) {
    this.getCountryFromIp();
  }

  public async getCountryFromIp() {
    try {
      const ipObject = await firstValueFrom(this.ipLocationService.getIpAddress())
      this.sessionStorage.ipAddressExternal = ipObject.ip;
      const countryObject = await firstValueFrom(this.ipLocationService.getCountryFromIpAddress(ipObject.ip));
      this.sessionStorage.countryIpAddressExternal = countryObject.country;
    } catch(error) {
      console.error('error', error);
    }
  }

}
