import { MessageService } from './message-service/message.service';
import { MessageComponent } from './message-service/message-component';
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
import { WaterLevelComponent } from './water-level/water-level.component';
import { LOCALE_ID } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    WatersTableComponent,
    StationsTableComponent,
    DashboardComponent,
    WaterLevelComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [PegelOnlineService,
   MessageService,
    // set the locale: used e.g for date formatting
    { provide: LOCALE_ID, useValue: 'de-DE' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
