import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';
@Injectable()
export class PaginationDataService {

  readonly dataConsumer = new Subject<any[]>();

  readonly subListProvider = new Subject<any[]>();

  onReady: () => void;
}
