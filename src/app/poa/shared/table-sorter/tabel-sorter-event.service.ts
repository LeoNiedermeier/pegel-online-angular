
import { Injectable } from '@angular/core';
import { Subject, Observer } from 'rxjs/Rx';

/**
 * Simple event dispatching service for TableSortChangeEvents.
 */
@Injectable()
export class TableSorterEventService {

  private readonly subject = new Subject<TableSortChangeEvent>();
  constructor() {
  }

  subscribe(subscriber: (value: TableSortChangeEvent) => void) {
    return this.subject
      .subscribe(subscriber);
  }

  post(event: TableSortChangeEvent) {
    this.subject.next(event);
  }
}

export class TableSortChangeEvent {

  /**
   * The compareFunction is used to sort the data.
   */
  constructor(public readonly property: string, public readonly compareFunction: (a: any, b: any) => number) {

  }
}
