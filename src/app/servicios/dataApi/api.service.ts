import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // ----------  CABECERA  ---------------
  headers: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
    Authorization: 'Bearer' + ' ' + localStorage.getItem('token')
  });

  // conseguir el nombre del coordinador segun se haya logeado en el login
  get_coordinador() {
    const api_url =
      'http://192.168.1.64/supervisores_api/public/api/HomeCoordinador';
    return this.http.get(api_url, { headers: this.headers });
  }

  // segun el coordinador te muestra segun la region que esté a cargo, las zonas que corresponden a la region
  get_zona() {
    const api_url =
      'http://192.168.1.64/supervisores_api/public/api/HomeCoordinador';
    return this.http.get(api_url, { headers: this.headers });
  }

  // segun la zona que haya escogido el coordinador muestra la lista de droguerias que corresponde a la zona
  get_detalle_zona(id_zona: number) {
    const api_url = `http://192.168.1.64/supervisores_api/public/api/sucursalesZona/${id_zona}`;
    return this.http.get(api_url, { headers: this.headers }).pipe(
      map(res => {
        return res;
      })
    );
  }
}
