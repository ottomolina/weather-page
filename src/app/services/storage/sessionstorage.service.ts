import { Injectable } from '@angular/core';
import * as SESSIONCONSTANTS from './sessionstorage.constants';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageService {

  constructor() { }

  get ipAddressExternal() {
    const ip = sessionStorage.getItem(SESSIONCONSTANTS.KEY_IP);
    return ip ? ip : '';
  }

  set ipAddressExternal(ip: string) {
    sessionStorage.setItem(SESSIONCONSTANTS.KEY_IP, ip);
  }

}
