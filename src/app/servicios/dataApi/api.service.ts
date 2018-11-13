import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  get_coordinador() {
    const api_url =
      'http://192.168.1.64/supervisores_api/public/api/HomeCoordinador';
    return this.http.get(api_url, { headers: this.headers });
  }

  get_zona() {
    const api_url =
      'http://192.168.1.64/supervisores_api/public/api/HomeCoordinador';
    return this.http.get(api_url, { headers: this.headers });
  }
}
