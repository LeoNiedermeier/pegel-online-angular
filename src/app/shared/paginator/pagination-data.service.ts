import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';
@Injectable()
export class PaginationDataService<T> {

  // TODO: not the best method interface. Does provide to much to client.
  // no need to unsubscribe, done in PaginatorComponent
  onReady: (inputDataConsumer: Subject<T[]>, subListProvider: Subject<T[]>) => void;
}
