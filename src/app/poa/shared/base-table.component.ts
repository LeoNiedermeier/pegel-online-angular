import { PaginationDataService } from '../../shared/paginator/pagination-data.service';
import { PoaUtils } from './utils';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs/Rx';
export abstract class BaseTableComponent<T> {

  data: T[] = [];

  sortAscending = true;
  sortProperty: string;

  inputData: T[] = [];
  // BehaviourSubject saves the last element
  inputDataSubject = new BehaviorSubject<T[]>([]);

  constructor(paginationDataService: PaginationDataService<T>) {
    paginationDataService.onReady =
      (inputDataConsumer: Subject<T[]>, subListProvider: Subject<T[]>) => {
        // "fetch" data from pagination
        subListProvider.subscribe(d => this.data = d);
        // push the data to the pagination
        this.inputDataSubject.subscribe(w => inputDataConsumer.next(w));
      };
  }


  updateInputData(newData: T[]): void {
    // We do change the array, therefore copy it in other not change the original array
    this.inputData = newData.slice(0);
    this.resort();
  }

  changeSortOrder(sortProperty: string): void {
    this.sortProperty = sortProperty;
    this.sortAscending = !this.sortAscending;
    this.resort();
  }

  private resort(): void {
    // note: sort method has a compare function as argument.
    if (this.sortProperty) {
      this.inputData.sort(
        PoaUtils.withAscending(this.sortAscending, PoaUtils.getComparator(this.sortProperty)));
    }
    this.inputDataSubject.next(this.inputData);
  }
}
