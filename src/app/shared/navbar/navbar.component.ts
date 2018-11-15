import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private apiService: ApiService, private router: Router) {
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
    this.apiService.get_coordinador_y_zona().subscribe(data => {
      this.coordinador = data['region'];

      // si quieres ver la region y que coordinador está a cargo, descomenta la linea de abajo
      // console.log(this.coordinador);
    });

    // funcion que tiene que inicializarse para que la sidebar pueda mostrarse ya que no se mostrará cuando este en modo telefono
    // y en vez de eso aparece un boton en la navbar
    this.togglear_sidebar();
  }

  // este metodo esta funcionando en los botones de cerrar sesion
  cerrarSesion() {
    // es opcional que se haga un alert confirmando si se quiere cerrar sesion
    this.router.navigate(['']);
    localStorage.removeItem('token');
  }

  togglear_sidebar() {
    $('#sidebarCollapse').on('click', function() {
      $('#sidebar, #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
  }
}
