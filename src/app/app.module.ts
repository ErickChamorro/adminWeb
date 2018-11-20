// modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// spinner
import { NgxSpinnerModule } from 'ngx-spinner';

// componentes de material (boton, forms, menus, checkbox e inputs)
import {
  MatButtonModule,
  MatFormFieldModule,
  MatMenuModule,
  MatInputModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatSelectModule,
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
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,

    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule
  ],
  exports: [
    // material buttons, forms, menus, iconos, checkbox, inputs
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [NavbarComponent, UserService, ApiService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
