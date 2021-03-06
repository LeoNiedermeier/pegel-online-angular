import { ActivatedRouteSnapshot, NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Message } from './core/message/message';
import { MessageService } from './core/message/message.service';
import { NgModule } from '@angular/core';
import { StationsResolver } from './poa/stations-table/stations-resolver.service';
import { StationsTableComponent } from './poa/stations-table/stations-table.component';
import { WaterLevelComponent } from './poa/water-level/water-level.component';
import { WaterLevelResolver } from './poa/water-level/water-level-resolver.service';
import { WATERS_RESOLVER } from './poa/waters-table/waters-resolver.service';
import { WatersTableComponent } from './poa/waters-table/waters-table.component';


/*
* Simple routing module compare https://angular.io/docs/ts/latest/tutorial/toh-pt5.html
*/
const routes: Routes = [
  { path: 'waters', component: WatersTableComponent, resolve: WATERS_RESOLVER },
  { path: 'stations', component: StationsTableComponent, resolve: { stations: StationsResolver } },
  // The station/level has a mandatory parameter, see https://angular.io/docs/ts/latest/guide/router.html#!#route-def-with-parameter
  // the data.waterLevels are resolved before entering the component
  { path: 'station/level/:stationShortName', component: WaterLevelComponent, resolve: { waterLevels: WaterLevelResolver } },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [WaterLevelResolver, StationsResolver, WATERS_RESOLVER.waters]
})
export class AppRoutingModule {

  constructor(messageService: MessageService, router: Router) {
    router.events.subscribe(event => {
      // clear the message panel on "page change"
      if (event instanceof NavigationStart) {
        messageService.publish(Message.clear());
      }
    });
  }
}

