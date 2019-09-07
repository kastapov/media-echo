import { Injectable } from '@angular/core';
import { blacklist } from './blacklist';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {

  constructor() { }

  public checkDomain(url) {
    const domain = this.getDomain(url);
    return blacklist.find(d => d.name === domain);
  }



  private getDomain(url, subdomain = false) {
    url = url.replace(/(https?:\/\/)?(www.)?/i, '');

    if (!subdomain) {
      url = url.split('.');
      url = url.slice(url.length - 2).join('.');
    }

    if (url.indexOf('/') !== -1) {
      return url.split('/')[0];
    }

    return url;
  }
}
