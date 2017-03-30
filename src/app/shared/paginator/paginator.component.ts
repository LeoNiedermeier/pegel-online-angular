import { PaginationDataService } from './pagination-data.service';
import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'poa-paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnDestroy {

  private linesPerPage = 10;

  currentPage = 0;

  private data: any[] = [];

  private subscription; Subscription;

  constructor(private paginationService: PaginationDataService) {
  }

  ngOnInit() {
    this.subscription = this.paginationService.dataConsumer
      .subscribe(d => { this.currentPage = 0; this.data = d; this.recalculatePages(); });
    if (this.paginationService.onReady) {
      this.paginationService.onReady();
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
    this.paginationService.subListProvider.next(waters);
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

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
