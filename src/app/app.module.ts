import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, RouteReuseStrategy } from '@angular/router';

// COPONENTE DE RUTAS
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PAGINAS Y SUBPAGINAS
import { HomeComponent } from './components/home/home.component';
import { SharedComponent } from './shared/shared.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BodyComponent } from './components/home/body/body.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FourCeroFourComponent } from './components/error-page/four-cero-four/four-cero-four.component';
import { FiveHundredComponent } from './components/error-page/five-hundred/five-hundred.component';

// componentes de material (boton, forms e inputs)
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SharedComponent,
    NavbarComponent,
    BodyComponent,
    DashboardComponent,
    ErrorPageComponent,
    FourCeroFourComponent,
    FiveHundredComponent
  ],
  imports: [
    BrowserModule,

    // material buttons, forms, inputs
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  exports: [
    // material buttons, forms, inputs
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
