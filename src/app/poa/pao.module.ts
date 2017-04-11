import { PaginatorAsViewChild } from '../shared/paginator-as-view-child/paginator-as-view-child.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PaginatorComponent } from '../shared/paginator/paginator.component';
import { PegelOnlineService } from './shared/pegel-online.service';
import { RouterModule } from '@angular/router';
import { StationsTableComponent } from './stations-table/stations-table.component';
import { TableSorterComponent } from './shared/table-sorter/table-sorter.component';
import { WaterLevelComponent } from './water-level/water-level.component';
import { WatersTableComponent } from './waters-table/waters-table.component';


@NgModule({
  declarations: [
    WatersTableComponent,
    StationsTableComponent,
    WaterLevelComponent,
    PaginatorComponent,
    PaginatorAsViewChild,
    TableSorterComponent
  ],
  imports: [RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PegelOnlineService],
})

export class PaoModule {
}
