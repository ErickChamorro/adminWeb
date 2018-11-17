import { Component, OnInit } from '@angular/core';

// servicios
import { ApiService } from '../../servicios/dataApi/api.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // variable para iterar en el HTML la lista de zonas
  zonas: any;
  constructor(
    private apiService: ApiService,
    private navbar: NavbarComponent
  ) {}

  ngOnInit() {
    // carga la funcion donde se suscribe a la api que tenga las zonas de la region que el coordinador esté a cargo
    this.mostrar_zonas();
  }

  mostrar_zonas() {
    this.navbar.get_coordinador_y_zona().subscribe(data => {
      this.zonas = data['Zonas'];
      console.log(data['Zonas']);
    });
    // this.apiService.get_coordinador_y_zona().subscribe(data => {
    //   this.zonas = data['Zonas'];

    // si quieres ver que zonas carga en la consola, descomenta la linea de abajo
    // console.log(data['Zonas']);
    // });
  }
}
