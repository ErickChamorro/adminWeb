// modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// componentes de material (boton, forms, menus e inputs)
import {
  MatButtonModule,
  MatFormFieldModule,
  MatMenuModule,
  MatInputModule,
  MatIconModule
} from '@angular/material';

// COMPONENTE DE RUTAS
import { AppRoutingModule } from './app-routing.module';

// PAGINAS Y SUBPAGINAS
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SharedComponent } from './shared/shared.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ZonaComponent } from './components/dashboard/zona/zona.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Error404Component } from './components/error/error404/error404.component';
import { Error401Component } from './components/error/error401/error401.component';

// servicios
import { UserService } from './servicios/user/user.service';
import { ApiService } from './servicios/dataApi/api.service';
import { PlanesformComponent } from './components/dashboard/zona/planesform/planesform.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SharedComponent,
    NavbarComponent,
    DashboardComponent,
    ZonaComponent,
    Error404Component,
    Error401Component,
    PlanesformComponent
  ],
  imports: [
    BrowserModule,

    // material buttons, forms, menus, iconos, inputs
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,

    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    // material buttons, forms, menus, iconos, inputs
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [NavbarComponent, UserService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
