import {ActivatedRoute, ActivatedRouteSnapshot, Params} from '@angular/router';
import {BaseTableComponent} from '../shared/base-table.component';
import {BehaviorSubject, Subject} from 'rxjs/Rx';
import {Component, OnInit, AfterViewInit} from '@angular/core';
import {PaginationDataService} from '../../shared/paginator/pagination-data.service';
import {Station} from '../shared/station.model';
import {TableSorterEventService} from '../shared/table-sorter/tabel-sorter-event.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'poa-stations-table',
  templateUrl: './stations-table.component.html',
  providers: [PaginationDataService, TableSorterEventService]
})
export class StationsTableComponent implements AfterViewInit {


  water: String = '';

  data: Station[] = [];

  private inputData: Station[] = [];

  private compareFunction: (a: Station, b: Station) => number;

  // BehaviourSubject saves the last element
  private inputDataSubject = new BehaviorSubject<Station[]>([]);

  constructor(private route: ActivatedRoute, paginationDataService: PaginationDataService<Station>,
    eventService: TableSorterEventService) {

    // access to parameter via snapshot
    this.water = route.snapshot.params['water'];


    // common code

    eventService.subscribe(e => {
      this.compareFunction = e.compareFunction;
      this.sortInputData();
    });
    paginationDataService.onReady =
      (inputDataConsumer: Subject<Station[]>, subListProvider: Subject<Station[]>) => {
        // "fetch" data from pagination
        subListProvider.subscribe(d => this.data = d);
        // push the data to the pagination
        this.inputDataSubject.subscribe(w => inputDataConsumer.next(w));
      };
  }


  ngAfterViewInit(): void {
    // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
    // section Asynchronous update
    setTimeout(() => {
      //  the only specific code, all other can be general.
      this.route.data.subscribe((data: {stations: Station[]}) => {
        // We do change the array, therefore copy it in other not change the original array
        this.inputData = data.stations.slice(0);
        this.sortInputData();
      });

    });
  }
  private sortInputData(): void {
    if (this.compareFunction) {
      this.inputData.sort(this.compareFunction);
    }
    this.inputDataSubject.next(this.inputData);
  }
}
