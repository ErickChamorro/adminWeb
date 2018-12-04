import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// servicios
import { ApiService } from '../../../servicios/dataApi/api.service';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.css']
})
export class ZonaComponent implements OnInit {
  // data que extrae del api de sucursales
  sucursales: any;
  id_zona: any;
  fecha_creacion: any;
  id_plan_trabajo: any;
  datos: any;
  supervisor_zona: any;

  // variable que contiene el nombre de la zona que se mostrara en este componente
  parametro_id_zona = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public navbar: NavbarComponent,
    public apiService: ApiService,
    private http: HttpClient) { }

  ngOnInit() {
    // funcion que muestra el listado de droguerias de la zona
    this.listar_droguerias();
    const fecha = new Date();
    this.fecha_creacion = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + (fecha.getDate());
  }

  listar_droguerias() {
    // funcion para gestionar parametros
    this.route.params.subscribe(data => {
      // tener api de sucursales
      this.navbar.get_detalle_zona(data['id']).subscribe(sucursales => {
        // variable donde se guarda el array que muestre las droguerias
        this.sucursales = sucursales['sucursal'];
        // variable donde guarda el nombre de la zona
        this.parametro_id_zona = sucursales['zona']['descripcion_zona'];
        // variable donde guarda el id de la sucursal
        this.id_zona = sucursales['sucursal']['0']['id_suscursal'];
        // variable donde guarda el nombre del supervisor a cargo que servira para mostrarlo en un titulo
        this.supervisor_zona = sucursales['sucursal']['0']['supervisor'];
        // console.log(this.id_zona);
        // console.log(this.parametro_id_zona);
        // console.log(this.supervisor_zona);

        // si quieres ver que nombre de la zona es en la consola descomenta la linea de abajo
        // console.log(this.sucursales);
      });
    });
  }

  submit_tester(supervisor: string, sucursal: number) {
    console.log('id_supervisor: ' + supervisor);
    console.log('id_sucursal: ' + sucursal);
  }

  crear_plan_de_trabajo(id_sucursal, fecha_creacion, id_supervisor) {
    // array donde estará los parametros que se necesita para hacer el POST a la api de CREAR_PLAN_TRABAJO
    // será el cuerpo de la ruta
    const data = { id_sucursal, fecha_creacion, id_supervisor };
    // para ingresar a la ruta del formulario ,tengo que volver a extraer el id de la zona a la cual escogi antes
    // para asi poder hacer el route.navigate a dicha ruta
    this.route.params.subscribe(parametro => {
      // variable donde esta el id de la zona que escogi (perdon por no poner el nombre adecuado de la variable)
      this.datos = parametro;
    });
    // console.log(this.datos);
    // **************************    POST CREAR PLAN DE TRABAJO     **************************************
    this.http.post(`${this.apiService.ip}/supervisores_api/public/api/CrearPlanTrabajo`, data,
      {
        headers: this.navbar.headers
      }).subscribe(respuesta => {
        // variable donde guarda el dato que recibo de la API
        this.id_plan_trabajo = respuesta['id_plan_trabajo'];
        // ingresar al formulario con los parametros ya reunidos
        this.router.navigate([`dashboard/zona/${this.datos['id']}/formulario/${this.id_plan_trabajo}`]);
        // console.log(this.id_plan_trabajo);
        console.log(respuesta);
      }, error => {
        console.log(data);
        console.log(error);
      });
    // this.router.navigate([`dashboard/zona/${this.datos}/formulario`]);
    // console.log(this.route);
  }
}
