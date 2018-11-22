import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../servicios/dataApi/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-planesform',
  templateUrl: './planesform.component.html',
  styleUrls: ['./planesform.component.css']
})
export class PlanesformComponent implements OnInit {
  planesform: FormGroup;
  items: FormArray;
  otroform: FormGroup;
  submitted = false;
  respuesta: any;
  array_fechas_apertura = [
    {
      fecha_inicio: '23-11-2018',
      fecha_fin: '24-11-2018'
    }
  ];
  objeto = {};
  public respuesta_servidor: boolean;
  nombre_sucursal: any;
  prioridades: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private navbar: NavbarComponent,
    private apiService: ApiService,
    private http: HttpClient
  ) {
    this.respuesta_servidor = true;

    this.planesform = this.formBuilder.group({
      id_plan_trabajo: new FormControl({ value: 1, disabled: false }),
      id_prioridad: new FormControl({ value: null }),
      fecha_inicio: new FormControl({ value: '', disabled: false }),
      fecha_fin: new FormControl({ value: '', disabled: false })
    });
  }

  ngOnInit() {
    this.get_sucursal();
    this.mostrar_prioridad();
  }

  comprobar() {
    this.otroform = this.formBuilder.group({
      fecha_inicio: new FormControl({
        value: this.fecha_inicio.value,
        disabled: false
      }),
      fecha_fin: new FormControl({
        value: this.fecha_fin.value,
        disabled: false
      })
    });
    this.objeto = {
      array_fechas_apertura: [
        this.otroform.value
      ]
    };
    console.log('solo fechas: ' + JSON.stringify(this.otroform.value));
    console.log(typeof (this.otroform.value));
    console.log('array de fechas apertura: ' + JSON.stringify(this.objeto));
    console.log('dentro del objeto: ' + JSON.stringify(this.objeto['array_fechas_apertura']));
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      inicio: '',
      fin: ''
    });
  }

  enviar_plan() {
    swal({
      title: 'Exito',
      text: 'Plan de trabajo asignado exitósamente',
      type: 'success'
    }).then(result => {
      // para volver a la pagina anterior...
      window.history.back();
    });
  }

  get_sucursal() {
    // funcion para gestionar parametros
    this.route.params.subscribe(data => {
      this.nombre_sucursal = data['id'];
    });
  }

  mostrar_prioridad() {
    this.navbar.mostrar_prioridad().subscribe(data => {
      this.prioridades = data['prioridades'];
      console.log(this.prioridades);
    });
  }

  // valores del formulario de planes de trabajo
  get number_id_plan_trabajo() {
    return this.planesform.get('id_plan_trabajo');
  }

  get number_id_prioridad() {
    return this.planesform.get('id_prioridad');
  }

  get fecha_inicio() {
    return this.planesform.get('fecha_inicio');
  }

  get fecha_fin() {
    return this.planesform.get('fecha_fin');
  }

  asignar_plan_de_trabajo() {
    this.otroform = this.formBuilder.group({
      fecha_inicio: new FormControl({
        value: this.fecha_inicio.value,
        disabled: false
      }),
      fecha_fin: new FormControl({
        value: this.fecha_fin.value,
        disabled: false
      })
    });

    this.objeto = {
      array_fechas_apertura: [
        this.otroform.value
      ]
    };

    this.http
      .post(
        `${this.apiService.ip}/supervisores_api/public/api/CrearActividadApertura?id_prioridad=${this.number_id_prioridad.value
        }&id_plan_trabajo=${this.number_id_plan_trabajo.value}`, this.objeto,
        { headers: this.apiService.headers_get }
      )
      .subscribe(
        respuesta => {
          swal({
            title: 'Exito',
            text: 'Plan de trabajo asignado exitósamente',
            type: 'success'
          }).then(result => {
            // para volver a la pagina anterior...
            // window.history.back();
            console.log(respuesta);
            console.log(result);
          });
          console.log(respuesta);
          // console.log(this.planesform.value);
        },
        error => {
          swal({
            title: 'Error de envio',
            text:
              'Hubo un error con el envio de los datos, seguro le falta otros parametros.',
            type: 'error'
          });
          console.log(error);
        }
      );
  }
}
