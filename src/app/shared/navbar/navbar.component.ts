import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../servicios/dataApi/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit() {
    // esto es para mostrar el usuario coordinador y las zonas que él esté a cargo
    // incluye una cabecera y se encuentra en servicio de API. presione F12 sobre la funcion "get_coordinador"
    // para que te lleve directo a la funcion
    this.apiService.get_coordinador().subscribe(data => {
      console.log(data);
    });
  }
}
