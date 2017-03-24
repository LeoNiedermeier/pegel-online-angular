import { PegelOnlineService, WaterLevel } from '../pegel-online/pegel-online.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'poa-water-level',
  templateUrl: './water-level.component.html'
})
export class WaterLevelComponent implements OnInit {

  waterLevels: WaterLevel[] = [];
  constructor(private pegelOnlineService: PegelOnlineService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.switchMap(
      (params: Params) => {
        const stationShortName = params['stationShortName'];
        return this.pegelOnlineService.getWaterLevels(stationShortName);
      }
    ).subscribe(l => this.waterLevels = l);
  }
}
