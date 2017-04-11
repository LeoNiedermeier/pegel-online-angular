import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';

@Component({
  selector: 'poa-paginator-as-view-child',
  templateUrl: './paginator-as-view-child.html'
})
export class PaginatorAsViewChild<T>  {


  /**
   * Can be set via "linesPerPage" attribute in element. If not, default (10) is used.
   */
  @Input() linesPerPage = 10;

  private pageData: T[] = [];

  private _currentPage = 1;

  private data: T[] = [];

  constructor() { }

  get currentPage(): number {
    return this._currentPage;
  }

  setData(data: T[]): void {
    this.data = data || [];
    this.recalculatePages();
  }

  getPageData(): T[] {
    return this.pageData;
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

  hasNextPage(): boolean {
    return (this._currentPage) * this.linesPerPage < this.data.length;
  }

  hasPreviousPage(): boolean {
    return this._currentPage > 1;
  }

  hasMoreThanOnePage(): boolean {
    return this.data.length / this.linesPerPage > 1;
  }

  gotoPage(page: number): void {
    // pages up to this page filled with data: (page -1)* linesPerPage data elements available, therefore:
    if (page > 0 && (page - 1) * this.linesPerPage < this.data.length) {
      this._currentPage = page;
      this.recalculatePages();
    }
  }

  private recalculatePages() {
    this.pageData = this.data.slice((this._currentPage - 1) * this.linesPerPage, this._currentPage * this.linesPerPage);
  }
}

