import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LOCALE_ID } from '@angular/core';
import { MessagePanelComponent } from './core/message-panel/message-panel.component';
import { MessageService } from './core/message/message.service';
import { NavigationLoadingOverlayComponent } from './core/navigation-loading-overlay/navigation-loading-overlay.component';
import { NgModule } from '@angular/core';
import { PaoModule } from './poa/pao.module';
import { PegelOnlineService } from './poa/shared/pegel-online.service';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessagePanelComponent,
    NavigationLoadingOverlayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    PaoModule
  ],
  providers: [
    MessageService,
    // set the locale: used e.g for date formatting
    { provide: LOCALE_ID, useValue: 'de-DE' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
