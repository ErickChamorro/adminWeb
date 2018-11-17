import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { CoordinadorInterface } from '../../models/coordinador';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  ip = 'http://192.168.1.4'; // servidor SENTOS
  // ip = '192.168.1.64';    // servidor cudris

  // ----------  CABECERA  ---------------
  headers: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
    Authorization: 'Bearer' + ' ' + localStorage.getItem('token')
  });

  // api Login
  // esa está en el Homecomponent.ts

  get_coordinador_y_zona() {
    const api_url = `${this.ip}/supervisores_api/public/api/HomeCoordinador`;
    return this.http.get(api_url, { headers: this.headers });
  }

  // api sucurzalesZona
  // está en NavbarComponent.ts (COMPONENTE PADRE)

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
}
