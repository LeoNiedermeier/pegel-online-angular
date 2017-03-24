import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class PegelOnlineService {

  // http://www.pegelonline.wsv.de/webservice/dokuRestapi

  private baseUrl: String = 'http://www.pegelonline.wsv.de/webservices/rest-api/v2/';

  constructor(private http: Http) { }

  public getStations(): Observable<Station[]> {
    // TODO: make url configurable
    return this.http.get(this.baseUrl + 'stations.json')
      // currently no error handling.
      .map(r => r.json() as Station[]);
  }
  
  public getStationsForWater(water: String): Observable<Station[]> {
    // TODO: make url configurable
    // `` : https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals
    return this.http.get(this.baseUrl + `stations.json?waters=${water}`)
      // currently no error handling.
      .map(r => r.json() as Station[]);
  }

  public getWaters(): Observable<Water[]> {
    // TODO: make url configurable
    return this.http.get(this.baseUrl + 'waters.json')
      // currently no error handling.
      .map(r => r.json() as Water[]);
  }

}

export class Station {

  uuid: string;
  'number': number;
  shortname: string;
  longname: string;
  km: number;
  agency: string;
  longitude: number;
  latitude: number;
  water: Water;
}

export class Water {
  shortname: string;
  longname: string;
}