import { PaginationDataService } from '../../shared/paginator/pagination-data.service';
import { PegelOnlineService } from '../shared/pegel-online.service';
import { Water } from '../shared/water.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'poa-waters-table',
  templateUrl: './waters-table.component.html',
  providers: [PaginationDataService]
})
export class WatersTableComponent implements OnInit, OnDestroy {

  waters: Water[] = [];

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private paginationDataService: PaginationDataService) {
  }

  ngOnInit() {
    this.subscription = this.paginationDataService.subListProvider.subscribe(w => this.waters = w);

    // TODO
    this.paginationDataService.onReady =
      () => this.route.data.subscribe((data: { waters: Water[] }) => this.paginationDataService.dataConsumer.next(data.waters));
  }


  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
