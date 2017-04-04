import { PaginationDataService } from './pagination-data.service';
import { Component, OnInit, Injectable, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'poa-paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent<T> implements OnInit {

  /**
   * Can be set via "linesPerPage" attribute in element. If not, default (10) is used.
   */
  @Input() linesPerPage = 10;

  private _currentPage = 1;

  private data: T[] = [];

  private readonly inputDataConsumer = new Subject<T[]>();

  private readonly subListProvider = new Subject<T[]>();

  constructor(private paginationService: PaginationDataService<T>) {
  }

  get currentPage(): number {
    return this._currentPage;
  }

  ngOnInit() {
    // The timing problem could be solved by a BehaviorSubject
    this.inputDataConsumer
      .subscribe(d => {
        this._currentPage = 1; this.data = d; this.recalculatePages();
      });
    if (this.paginationService.onReady) {
      this.paginationService.onReady(this.inputDataConsumer, this.subListProvider);
    }
  }

  public nextPage(): void {
    if (this.hasNextPage()) {
      this._currentPage++;
      this.recalculatePages();
    }
  }

  public previousPage(): void {
    if (this.hasPreviousPage) {
      this._currentPage--;
      this.recalculatePages();
    }
  }



  private recalculatePages() {
    const page = this.data.slice((this._currentPage - 1) * this.linesPerPage, this._currentPage * this.linesPerPage);
    this.subListProvider.next(page);
  }

  hasNextPage(): boolean {
    return (this._currentPage) * this.linesPerPage < this.data.length;
  }

  hasPreviousPage(): boolean {
    return this._currentPage > 1;
  }

  gotoPage(page: number): void {
    // pages up to this page filled with data: (page -1)* linesPerPage data elements available, therefore:
    if (page > 0 && (page - 1) * this.linesPerPage < this.data.length) {
      this._currentPage = page;
      this.recalculatePages();
    }
  }
}
