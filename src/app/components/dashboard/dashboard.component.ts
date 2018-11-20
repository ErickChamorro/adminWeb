import { Component, OnInit } from '@angular/core';

// servicios
import { ApiService } from '../../servicios/dataApi/api.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // variable para iterar en el HTML la lista de zonas
  zonas: any;
  constructor(private navbar: NavbarComponent, private router: Router) {}

  ngOnInit() {
    // carga la funcion donde se suscribe a la api que tenga las zonas de la region que el coordinador esté a cargo
    this.mostrar_zonas();
    // si se quiere probar con scroll reveal
    // this.animar_tarjetas();
  }

  mostrar_zonas() {
    // tener la api de HomeCoordinador
    this.navbar.get_coordinador_y_zona().subscribe(
      data => {
        // variable donde guarda el listado de zonas
        this.zonas = data['Zonas'];
        // console.log(data);
      },
      error => {
        swal({
          title: 'Usuario no autorizado en esta página',
          text:
            'No es posible entrar si su rol no es COORDINADOR o ADMINISTRADOR!',
          type: 'error'
        });
        localStorage.removeItem('token');
        this.router.navigate(['']);
        // descomenta la linea de abajo para ver los errores
        // console.log(error);
      }
    );
  }

  // si se quiere probar con scroll reveall
  // animar_tarjetas() {
  //   const opciones = {
  //     origin: 'bottom',
  //     delay: '100',
  //     distance: '60px',
  //     easing: 'ease-in-out',
  //     reset: 'true'
  //   };
  //   ScrollReveal().reveal('.tarjetas', opciones);
  // }
}
