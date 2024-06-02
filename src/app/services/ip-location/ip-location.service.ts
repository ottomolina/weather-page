import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IpExternal } from 'src/app/models/ip-external.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IpLocationService {

  constructor(
    private http: HttpClient
  ) { }

  public getIpAddress(): Observable<IpExternal> {
    return this.http.get<IpExternal>(environment.urlDetectIp);
  }

}
