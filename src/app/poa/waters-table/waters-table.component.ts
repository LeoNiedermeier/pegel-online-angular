import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../shared/base-table.component';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { PaginationDataService } from '../../shared/paginator/pagination-data.service';
import { PegelOnlineService } from '../shared/pegel-online.service';
import { Water } from '../shared/water.model';

@Component({
  selector: 'poa-waters-table',
  templateUrl: './waters-table.component.html',
  providers: [PaginationDataService]
})
export class WatersTableComponent extends BaseTableComponent<Water> {

  constructor(route: ActivatedRoute, paginationDataService: PaginationDataService<Water>) {
    super(paginationDataService);

    this.sortProperty = 'longname';

    route.data.subscribe((data: { waters: Water[] }) => this.updateInputData(data.waters));
  }

  // private readonly compareByShortname = (a: Water, b: Water) => a.shortname.localeCompare(b.shortname);

}
