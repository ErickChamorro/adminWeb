import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ZonaComponent } from './components/dashboard/zona/zona.component';
import { Error404Component } from './components/error/error404/error404.component';
import { Error401Component } from './components/error/error401/error401.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/zona', component: ZonaComponent },
  { path: 'error/404', component: Error404Component },
  { path: 'error/401', component: Error401Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
