import { Station, PegelOnlineService } from '../shared/pegel-online.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'poa-stations-table',
  templateUrl: './stations-table.component.html'
})
export class StationsTableComponent implements OnInit {

  stations: Station[] = [];

  water: String = '';

  constructor(private pegelOnlineService: PegelOnlineService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      const water = params['water'];
      console.log('WATER: ' + water);
      if (water == null) {
        this.water = null;
        return this.pegelOnlineService.getStations();
      } else {
        this.water = water;
        return this.pegelOnlineService.getStationsForWater(water);
      }
    }).subscribe(s => this.stations = s);
  }
}
