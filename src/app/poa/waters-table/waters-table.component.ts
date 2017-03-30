import { PegelOnlineService } from '../shared/pegel-online.service';
import { Water } from '../shared/water.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'poa-waters-table',
  templateUrl: './waters-table.component.html'
})
export class WatersTableComponent implements OnInit {
  waters: Water[] = [];

  private linesPerPage = 10;

  currentPage = 0;

  private data: Water[] = [];

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe((data: { waters: Water[] }) => { this.data = data.waters; this.currentPage = 0; this.recalculatePages(); });
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
    this.waters = this.data.slice(this.currentPage * this.linesPerPage, (this.currentPage + 1) * this.linesPerPage);
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
