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
    [class.fa-sort-asc]="ascending && active"
    [class.fa-sort-desc]="!ascending && active"
    [class.fa-sort]="!active"></i>
</span>
`
})
export class TableSorterComponent implements OnInit {

  /**
   * The object property path which is used for sorting. Can be nested path.
   */
  @Input('property')
  property: string;

  /**
   * Indicates whether the initial sorting should be done with this instance.
   */
  @Input('initialActive')
  initialActive = false;

  active = false;
  ascending = true;

  constructor(private eventService: TableSorterEventService) {
    // if another sorter was activated, this one should be deactivated.
    // This can be checked by comparing the property to sort:
    eventService.subscribe(e => this.active = e.property === this.property);
  }

  ngOnInit(): void {
    if (this.initialActive) {
      // triggers the initial sorting
      this.postEvent();
    }
  }

  switchSortOrder(): void {
    this.ascending = !this.ascending;
    this.postEvent();
  }

  private postEvent(): void {
    this.eventService.post(
      new TableSortChangeEvent(this.property,
        // the compare function to use for sorting.
        PoaUtils.withAscending(this.ascending, PoaUtils.getComparator(this.property))));
  }
}
