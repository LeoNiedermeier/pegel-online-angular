import { ConnectableObservable, Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Station } from './station.model';
import { Water } from './water.model';
import { WaterLevel } from './waterlevel.model';

@Injectable()
// currently no error handling.
// TODO: Stations and waters cacheable
export class PegelOnlineService {

  // http://www.pegelonline.wsv.de/webservice/dokuRestapi

  // TODO: make url configurable
  private baseUrl: String = 'http://www.pegelonline.wsv.de/webservices/rest-api/v2/';

  private waters: Observable<Water[]>;

  private stations: Observable<Station[]>;

  constructor(private http: Http) { }

  public getStations(): Observable<Station[]> {
    if (!this.stations) {
      this.stations = this.http.get(this.baseUrl + 'stations.json')
        .map(r => r.json() as Station[])
        .publishReplay()
        .refCount();
    }
    return this.stations;
  }

  public getStationsForWater(water: String): Observable<Station[]> {
    // `` : https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals
    return this.http.get(this.baseUrl + `stations.json?waters=${water}`)
      .map(r => r.json() as Station[]);
  }


  public getWaters(): Observable<Water[]> {
    if (!this.waters) {
      this.waters =
        this.http.get(this.baseUrl + 'waters.json')
          // evaluate response status?
          .map(r => r.json() as Water[])
          // http://stackoverflow.com/documentation/rxjs/8247/common-recipes/26490/caching-http-responses#t=201612161544428695958
          .publishReplay(1)
          .refCount();
    }
    return this.waters;
  }

  public getWaterLevels(station: String): Observable<WaterLevel[]> {
    // http://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/BONN/W/measurements.json
    return this.http.get(this.baseUrl + `stations/${station}/W/measurements.json`)
      .map(r => r.json() as WaterLevel[]);
  }
}
