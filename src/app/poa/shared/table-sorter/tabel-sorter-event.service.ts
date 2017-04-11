
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observer, Subscription } from 'rxjs/Rx';

/**
 * Simple event dispatching service for TableSortChangeEvents.
 */
@Injectable()
export class TableSorterEventService implements OnDestroy {

  private readonly subject = new Subject<TableSortChangeEvent>();
  constructor() {
  }

  subscribe(subscriber: (value: TableSortChangeEvent) => void): Subscription {
    return this.subject
      .subscribe(subscriber);
  }

  post(event: TableSortChangeEvent) {
    this.subject.next(event);
  }

  ngOnDestroy(): void {
    // the lifecycle of the service is bound to the host component via provider configuration.
    // If the host component is destroyed, this service will be also destroyed.
    this.subject.complete();
  }
}

export class TableSortChangeEvent {

  /**
   * The compareFunction is used to sort the data.
   */
  constructor(public readonly property: string, public readonly compareFunction: (a: any, b: any) => number) {

  }
}
