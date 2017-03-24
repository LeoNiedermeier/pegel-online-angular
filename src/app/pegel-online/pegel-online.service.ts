import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
// currently no error handling.
// TODO: Stations and waters cacheable
export class PegelOnlineService {

  // http://www.pegelonline.wsv.de/webservice/dokuRestapi

  // TODO: make url configurable
  private baseUrl: String = 'http://www.pegelonline.wsv.de/webservices/rest-api/v2/';

  constructor(private http: Http) { }

  public getStations(): Observable<Station[]> {
    return this.http.get(this.baseUrl + 'stations.json')
      .map(r => r.json() as Station[]);
  }

  public getStationsForWater(water: String): Observable<Station[]> {
    // `` : https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals
    return this.http.get(this.baseUrl + `stations.json?waters=${water}`)
      .map(r => r.json() as Station[]);
  }

  public getWaters(): Observable<Water[]> {
    return this.http.get(this.baseUrl + 'waters.json')
      .map(r => r.json() as Water[]);
  }

  public getWaterLevels(station: String): Observable<WaterLevel[]> {
    // http://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/BONN/W/measurements.json
    return this.http.get(this.baseUrl + `stations/${station}/W/measurements.json`)
      .map(r => r.json() as WaterLevel[]);
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

export class WaterLevel {
  timestamp: Date;
  value: number;
}
