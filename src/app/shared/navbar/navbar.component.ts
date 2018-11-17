import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $: any;

// services
import { ApiService } from '../../servicios/dataApi/api.service';

// interfaces
import { CoordinadorInterface } from '../../models/coordinador';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  coordinador: CoordinadorInterface;

  // ----------  CABECERA  ---------------
  headers: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
    Authorization: 'Bearer' + ' ' + localStorage.getItem('token')
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) {
    // las propiedades que tiene el array de "region"
    this.coordinador = {
      nombre: '',
      apellido: '',
      id_cordinador: null,
      id_region: null,
      region: ''
    };
  }

  ngOnInit() {
    // esto es para mostrar el usuario coordinador y las zonas que él esté a cargo
    // incluye una cabecera y se encuentra en servicio de API. presione F12 sobre la funcion "get_coordinador_y_zona"
    // para que te lleve directo a la funcion
    this.get_coordinador_y_zona().subscribe(data => {
      this.coordinador = data['region'];
      // si quieres ver la region y que coordinador está a cargo, descomenta la linea de abajo
      // console.log(this.coordinador);
    });

    // funcion que tiene que inicializarse para que la sidebar pueda mostrarse ya que no se mostrará cuando este en modo telefono
    // y en vez de eso aparece un boton en la navbar
    this.togglear_sidebar();
  }

  // api HomeCoordinador
  // conseguir el nombre del coordinador segun se haya logeado en el login
  get_coordinador_y_zona() {
    const api_url = `${
      this.apiService.ip
    }/supervisores_api/public/api/HomeCoordinador`;
    return this.http.get(api_url, { headers: this.headers });
  }

  // api sucurzalesZona (usado por: ZonaComponent.ts)
  // segun la zona que haya escogido el coordinador muestra la lista de droguerias que corresponde a la zona
  get_detalle_zona(id_zona: number) {
    const api_url = `${
      this.apiService.ip
    }/supervisores_api/public/api/sucursalesZona/${id_zona}`;
    return this.http.get(api_url, { headers: this.headers });
  }

  // este metodo esta funcionando en los botones de cerrar sesion
  // **************************************      LOGOUT       *******************************************
  cerrarSesion() {
    // es opcional que se haga un alert confirmando si se quiere cerrar sesion
    // const token = localStorage.getItem('token');
    // const api_url = `${this.apiService.ip}/nombre_de_api/logout/${token}`;
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');
    this.router.navigate(['']);
    // SE REQUIERE DE ALGUNA API QUE GESTIONE EL LOGOUT PARA ELIMINAR EL TOKEN EN EL SERVIDOR
    // this.http.post<CoordinadorInterface>(api_url, {
    //   headers: new HttpHeaders({
    //     Authorization: 'Access',
    //     'Content-Type': 'application/json'
    //   })
    // })
    // .subscribe(respuesta => {
    //   console.log(respuesta);
    // });
  }

  togglear_sidebar() {
    $('#sidebarCollapse').on('click', function() {
      $('#sidebar, #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
  }
}
