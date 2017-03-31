import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';
@Injectable()
export class PaginationDataService<T> {

  onReady: (inputDataConsumer: Subject<T[]>, subListProvider: Subject<T[]>) => void;
}
