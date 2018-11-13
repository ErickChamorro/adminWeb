// modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// componentes de material (boton, forms e inputs)
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
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
import { ZonasComponent } from './components/dashboard/zonas/zonas.component';

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
    ZonasComponent
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
  providers: [NavbarComponent, UserService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
