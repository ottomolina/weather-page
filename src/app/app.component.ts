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
    firstValueFrom(this.ipLocationService.getIpAddress()).then((response: IpExternal) => {
      this.sessionStorage.ipAddressExternal = response.ip;
    })
  }

}
