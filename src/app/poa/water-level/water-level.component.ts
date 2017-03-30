import { PegelOnlineService } from '../shared/pegel-online.service';
import { WaterLevel } from '../shared/waterlevel.model';
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
    // use the resolved data
    this.route.data.subscribe((data: { waterLevels: WaterLevel[] }) => this.waterLevels = data.waterLevels);

    /*
        this.route.params.switchMap(
          (params: Params) => {
            const stationShortName = params['stationShortName'];
            return this.pegelOnlineService.getWaterLevels(stationShortName);
          }
        ).subscribe(l => this.waterLevels = l);
      }
      */
  }
}

