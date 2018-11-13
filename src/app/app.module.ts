import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// componentes de material (boton, forms e inputs)
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

// COPONENTE DE RUTAS
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PAGINAS Y SUBPAGINAS
import { HomeComponent } from './components/home/home.component';
import { SharedComponent } from './shared/shared.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ZonaComponent } from './components/dashboard/zona/zona.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// servicios
import { UserService } from './servicios/user.service';
import { Error404Component } from './components/error/error404/error404.component';
import { Error401Component } from './components/error/error401/error401.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SharedComponent,
    NavbarComponent,
    DashboardComponent,
    ZonaComponent,
    Error404Component,
    Error401Component
  ],
  imports: [
    BrowserModule,

    // material buttons, forms, inputs
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    // material buttons, forms, inputs
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [NavbarComponent, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
