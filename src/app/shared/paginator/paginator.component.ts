import { PaginationDataService } from './pagination-data.service';
import { Component, OnInit, Injectable, OnDestroy, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'poa-paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent<T> implements OnInit {

  /**
   * Can be set via attribute in element. If not, default (10) is used.
   */
  @Input() linesPerPage = 10;

  currentPage = 0;

  private data: T[] = [];

  private readonly inputDataConsumer = new Subject<T[]>();

  private readonly subListProvider = new Subject<T[]>();

  constructor(private paginationService: PaginationDataService<T>) {
  }

  ngOnInit() {
    this.inputDataConsumer
      .subscribe(d => { this.currentPage = 0; this.data = d; this.recalculatePages(); });
    if (this.paginationService.onReady) {
      this.paginationService.onReady(this.inputDataConsumer, this.subListProvider);
    }
  }

  public nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.recalculatePages();
    }
  }

  public previousPage(): void {
    if (this.hasPreviousPage) {
      this.currentPage--;
      this.recalculatePages();
    }
  }



  private recalculatePages() {
    const waters = this.data.slice(this.currentPage * this.linesPerPage, (this.currentPage + 1) * this.linesPerPage);
    this.subListProvider.next(waters);
  }

  hasNextPage(): boolean {
    return (this.currentPage + 1) * this.linesPerPage < this.data.length;
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 0;
  }

  gotoPage(page: number): void {
    if (page > 0 && (page + 1) * this.linesPerPage < this.data.length) {
      this.currentPage = page;
      this.recalculatePages();
    }
  }
}
