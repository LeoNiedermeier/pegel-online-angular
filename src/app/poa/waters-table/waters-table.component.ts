import { PegelOnlineService } from '../shared/pegel-online.service';
import { Water } from '../shared/water.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'poa-waters-table',
  templateUrl: './waters-table.component.html'
})
export class WatersTableComponent implements OnInit {
  waters: Water[] = [];

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe((data: { waters: Water[] }) => this.waters = data.waters);
  }
}
