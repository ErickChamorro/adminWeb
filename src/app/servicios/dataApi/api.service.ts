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
  token = localStorage.getItem('token');

  // ----------  CABECERA  ---------------
  headers: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
    Authorization: 'Bearer' + ' ' + this.token
  });

  // api Login
  // esa está en el Homecomponent.ts

  // api HomeCoordinador
  // conseguir el nombre del coordinador segun se haya logeado en el login
  get_coordinador_y_zona() {
    const api_url = `${this.ip}/supervisores_api/public/api/HomeCoordinador`;
    return this.http.get(api_url, { headers: this.headers });
  }

  // api sucurzalesZona
  // segun la zona que haya escogido el coordinador muestra la lista de droguerias que corresponde a la zona
  get_detalle_zona(id_zona: number) {
    const api_url = `${
      this.ip
    }/supervisores_api/public/api/sucursalesZona/${id_zona}`;
    return this.http.get(api_url, { headers: this.headers });
  }

  // esto se utilizara en el GUARD para validar si el usuario tiene permitido el acceso a la ruta
  get_current_user() {
    const user_string = localStorage.getItem('token');
    if (!isNullOrUndefined(user_string)) {
      const user = user_string;
      return user;
    } else {
      return null;
    }
  }
}
