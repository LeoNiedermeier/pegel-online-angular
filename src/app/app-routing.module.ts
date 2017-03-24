import { DashboardComponent } from './dashboard/dashboard.component';
import { StationsTableComponent } from './stations-table/stations-table.component';
import { WaterLevelComponent } from './water-level/water-level.component';
import { WatersTableComponent } from './waters-table/waters-table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*
* Simple routing module compare https://angular.io/docs/ts/latest/tutorial/toh-pt5.html
*/
const routes: Routes = [
  { path: 'waters', component: WatersTableComponent },
  { path: 'stations', component: StationsTableComponent },
  // The station/level has a mandatory parameter, see https://angular.io/docs/ts/latest/guide/router.html#!#route-def-with-parameter
  { path: 'station/level/:stationShortName', component: WaterLevelComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
