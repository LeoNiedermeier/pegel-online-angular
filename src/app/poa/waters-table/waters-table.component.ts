import { PaginationDataService } from '../../shared/paginator/pagination-data.service';
import { PegelOnlineService } from '../shared/pegel-online.service';
import { Water } from '../shared/water.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs/Rx';

@Component({
  selector: 'poa-waters-table',
  templateUrl: './waters-table.component.html',
  providers: [PaginationDataService]
})
export class WatersTableComponent {

  waters: Water[] = [];


  constructor(route: ActivatedRoute, paginationDataService: PaginationDataService<Water>) {
    paginationDataService.onReady =
      (inputDataConsumer: Subject<Water[]>, subListProvider: Subject<Water[]>) => {
        // "fetch" data from pagination
        subListProvider.subscribe(w => this.waters = w);
        // push the data to the pagination
        route.data.subscribe((data: { waters: Water[] }) => inputDataConsumer.next(data.waters));
      };
  }
}
