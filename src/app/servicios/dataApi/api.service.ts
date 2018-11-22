import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // ip = 'http://192.168.1.4'; // servidor SENTOS
  // ip = 'http://192.168.1.64';    // servidor cudris
  ip = 'http://192.168.1.185';

  // ----------  CABECERA GET  ---------------
  headers_get: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
    Authorization: 'Bearer' + ' ' + localStorage.getItem('token')
  });

  // ----------  CABECERA POST   -----------------
  headers_post: HttpHeaders = new HttpHeaders({
    Authorization: 'Access',
    'Content-Type': 'application/json'
  });

  // ----------  CABECERA PLANES POST ------------
  headers_planes: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });

  // api Login
  // esa está en el Homecomponent.ts

  get_coordinador_y_zona() {
    const api_url = `${this.ip}/supervisores_api/public/api/HomeCoordinador`;
    return this.http.get(api_url, { headers: this.headers_get });
  }

  // api sucurzalesZona
  // está en NavbarComponent.ts (COMPONENTE PADRE)
  get_detalle_zona(id_zona: number) {
    const api_url = `${
      this.ip
    }/supervisores_api/public/api/sucursalesZona/${id_zona}`;
    return this.http.get(api_url, { headers: this.headers_get });
  }

  // esto se utilizara en el GUARD para validar si el usuario tiene permitido el acceso a la ruta
  comprobar_token() {
    const token_string = localStorage.getItem('token');
    if (!isNullOrUndefined(token_string)) {
      const Token = token_string;
      return Token;
    } else {
      return null;
    }
  }

  // // mostrar prioridad
  // mostrar_prioridad() {
  //   const api_url = `${this.ip}/supervisores_api/public/api/MostrarPrioridad`;
  //   return this.http.get(api_url, { headers: this.headers_get });
  // }
}
