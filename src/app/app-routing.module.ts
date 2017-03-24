import { DashboardComponent } from './dashboard/dashboard.component';
import { StationsTableComponent } from './stations-table/stations-table.component';
import { WatersTableComponent } from './waters-table/waters-table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*
Simple routing module compare https://angular.io/docs/ts/latest/tutorial/toh-pt5.html
*/
const routes: Routes = [
  { path: 'waters', component: WatersTableComponent },
  { path: 'stations', component: StationsTableComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
