import { PaginatorComponent } from '../shared/paginator/paginator.component';
import { PegelOnlineService } from './shared/pegel-online.service';
import { StationsTableComponent } from './stations-table/stations-table.component';
import { WaterLevelComponent } from './water-level/water-level.component';
import { WatersTableComponent } from './waters-table/waters-table.component';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TableSorterComponent } from './shared/table-sorter/table-sorter.component';
@NgModule({
  declarations: [
    WatersTableComponent,
    StationsTableComponent,
    WaterLevelComponent,
    PaginatorComponent,
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
