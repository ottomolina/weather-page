import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryIpAddress } from 'src/app/models/country-ip-address.model';
import { IpExternal } from 'src/app/models/ip-external.model';
import { Place } from 'src/app/models/place.model';
import { Weather } from 'src/app/models/weater.model';
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

  public getListPlaces(place: string): Observable<Array<Place>> {
    let url = `${environment.urlPlaces}`;
    url = url.replace('{place}', encodeURIComponent(place));
    return this.http.get<Array<Place>>(url);
  }

  public getWeatherByCoords(latitude: string, longitude: string): Observable<Weather> {
    let url = `${environment.urlWeather}`;
    url = url.replace('{lat}', encodeURIComponent(latitude));
    url = url.replace('{lon}', encodeURIComponent(longitude));
    return this.http.get<Weather>(url);
  }

}
