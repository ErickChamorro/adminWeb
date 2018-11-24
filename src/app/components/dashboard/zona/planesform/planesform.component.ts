import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../servicios/dataApi/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-planesform',
  templateUrl: './planesform.component.html',
  styleUrls: ['./planesform.component.css']
})
export class PlanesformComponent implements OnInit {
  // variable que guarda TODOS los campos del formulario de plan de trabajo
  planesform: FormGroup;
  // variable que agrupa SOLO las fechas de inicio y fin al momento de presionar el boton de enviar
  fechas_form: FormGroup;
  // estado del boton al iniciar la pagina
  submitted = false;
  respuesta: any;
  // array donde guardará otro array que es el de las fechas para que sea un objeto que contendrá un array
  objeto = {};
  public respuesta_servidor: boolean;
  // variable donde guarda el nombre de la sucursal a la que se enviará el plan de trabajo
  nombre_sucursal: any;
  // variable donde guardará la lista de prioridades que se usará en un select y de ahi sacar el ID de cada prioridad
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
    // grupo donde contiene TODOS los campos
    this.planesform = this.formBuilder.group({
      id_plan_trabajo: [1],
      id_prioridad: [],
      fecha_inicio: [],
      fecha_fin: []
    });
  }

  ngOnInit() {
    // metodo para mostrar el nombre de la sucursal
    this.get_sucursal();
    // metodo para mostrar las prioridades en un select
    this.mostrar_prioridad();
    $('#btnAgregar').popover({ trigger: 'hover' });
    $('#btnVer').popover({ trigger: 'hover' });
  }

  // pon esto en el NGSUBMIT del html para que con este metodo muestre en un console.log como se enviará los datos
  // en la base de datos de la API
  simular_envio() {
    this.fechas_form = this.formBuilder.group({
      fecha_inicio: [],
      fecha_fin: []
    });
    this.objeto = {
      array_fechas_apertura: [
        this.planesform.value
      ]
    };
    console.log('solo fechas: ' + JSON.stringify(this.fechas_form.value));
    console.log(typeof (this.fechas_form.value));
    console.log('array de fechas apertura: ' + JSON.stringify(this.objeto));
    console.log('dentro del objeto: ' + JSON.stringify(this.objeto['array_fechas_apertura']));
  }

  get_sucursal() {
    // funcion para gestionar parametros
    this.route.params.subscribe(data => {
      console.log(data);
      this.nombre_sucursal = data['id'];

    });
  }

  mostrar_prioridad() {
    this.navbar.mostrar_prioridad().subscribe(data => {
      this.prioridades = data['prioridades'];
      // console.log(this.prioridades);
    });
  }

  // valores del formulario de planes de trabajo obtenidas independientemente
  // estos datos los agarra de planesform
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

  agregar_array_fechas() {
    return this.formBuilder.group({
      fecha_inicio: new FormControl({
        value: this.fecha_inicio.value,
        disabled: false
      }),
      fecha_fin: new FormControl({
        value: this.fecha_fin.value,
        disabled: false
      })
    });
  }

  // metodo para enviar los datos a la API de CREAR APERTURA
  asignar_plan_de_trabajo() {

    // se agrupa en un array las fechas de inicio y fin
    this.fechas_form = this.formBuilder.group({
      fecha_inicio: new FormControl({
        value: this.fecha_inicio.value,
        disabled: false
      }),
      fecha_fin: new FormControl({
        value: this.fecha_fin.value,
        disabled: false
      })
    });

    // se crea un objeto con el nombre tal cual la API pide que es "array_fechas_apertura"
    // y dentro se coloca el array de las fechas de inicio y fin
    this.objeto = {
      array_fechas_apertura: [
        this.fechas_form.value
      ]
    };

    // por ultimo se hace el POST a la API (Crear Apertura) con los parametros que pide como: la prioridad que se escogio en el formulario,
    // el numero de plan de trabajo y el contenido, que es el objeto que contiene el array de fechas de inicio y fin
    this.http
      .post(
        `${this.apiService.ip}/supervisores_api/public/api/CrearActividadApertura?id_prioridad=${this.number_id_prioridad.value
        }&id_plan_trabajo=${this.number_id_plan_trabajo.value}`, this.objeto,
        { headers: this.apiService.headers_get }
      )
      .subscribe(
        respuesta => {
          // si el usuario envia los datos de manera incompleta se notifica en un alert la descripcion del error
          // si esta todo correcto, se notifica en un alert que sus datos han sido enviados.
          swal({
            title: 'Actividad Apertura',
            text: 'Plan de trabajo asignado exitosamente.',
            type: 'success'
          }).then(result => {
            // para volver a la pagina anterior...
            window.history.back();
          });
          console.log(respuesta);
        },
        error => {
          swal({
            title: 'Datos no enviados',
            text: JSON.stringify(error),
            type: 'error'
          });
        }
      );
  }
}
