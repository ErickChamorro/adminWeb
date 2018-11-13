import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {
  constructor() {}

  // funcion para el boton que tiene que mostrar la sidebar y ocultarla
  // integraserlo a todas las paginas que se crea de ahora en adelante
  togglear_sidebar() {
    $('#sidebarCollapse').on('click', function() {
      $('#sidebar, #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
  }
}
