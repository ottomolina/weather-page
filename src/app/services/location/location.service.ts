import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryIpAddress } from 'src/app/models/country-ip-address.model';
import { IpExternal } from 'src/app/models/ip-external.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient
  ) { }

  public getIpAddress(): Observable<IpExternal> {
    return this.http.get<IpExternal>(environment.urlDetectIp);
  }

  public getCountryFromIpAddress(ip: string): Observable<CountryIpAddress> {
    return this.http.get<CountryIpAddress>(`${environment.urlCountryIpAddress}${ip}`);
  }

}
