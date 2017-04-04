import { PaginationDataService } from '../../shared/paginator/pagination-data.service';
import { BaseTableComponent } from '../shared/base-table.component';
import { PegelOnlineService } from '../shared/pegel-online.service';
import { Water } from '../shared/water.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Subject, Observable, BehaviorSubject } from 'rxjs/Rx';

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
