import { PegelOnlineService } from '../shared/pegel-online.service';
import { Water } from '../shared/water.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'poa-waters-table',
  templateUrl: './waters-table.component.html'
})
export class WatersTableComponent implements OnInit {
  waters: Water[] = [];

  constructor(private pegelOnlineService: PegelOnlineService) {

  }

  ngOnInit() {
    this.pegelOnlineService.getWaters().subscribe(w => this.waters = w);
  }

  public showStations(water: Water): void {

  }
}
