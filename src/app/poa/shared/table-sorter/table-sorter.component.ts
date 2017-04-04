import { PoaUtils } from '../utils';
import { TableSorterEventService, TableSortChangeEvent } from './tabel-sorter-event.service';
import { Component, Input, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'poa-table-sorter',
  template:
  `
<span role="button" (click)="switchSortOrder()">
<!-- Transclusion using ng-content -->
 <ng-content></ng-content>
  <i class="fa"  aria-hidden="true"
    [class.fa-sort-asc]="sortAscending && active"
    [class.fa-sort-desc]="!sortAscending && active" 
    [class.fa-sort]="!active"></i>
</span>
`
})
export class TableSorterComponent implements OnInit {

  sortAscending = true;

  @Input('property')
  property: string;

  @Input('initialActive')
  initialActive = false;

  active = false;

  constructor(private eventService: TableSorterEventService) {
    eventService.subscribe(e => this.active = e.property === this.property);
  }

  ngOnInit(): void {
    if (this.initialActive) {
      this.postEvent();
    }
  }

  private postEvent(): void {
    this.eventService.post(new TableSortChangeEvent(this.property,
      PoaUtils.withAscending(this.sortAscending, PoaUtils.getComparator(this.property))));
  }

  switchSortOrder(): void {
    this.sortAscending = !this.sortAscending;
    this.postEvent();
  }
}
