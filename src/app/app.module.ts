import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PegelOnlineService } from './pegel-online/pegel-online.service';
import { StationsTableComponent } from './stations-table/stations-table.component';
import { WatersTableComponent } from './waters-table/waters-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    WatersTableComponent,
    StationsTableComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [PegelOnlineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
