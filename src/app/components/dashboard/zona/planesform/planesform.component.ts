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
  apertura_form: FormGroup;
  // variable que agrupa SOLO las fechas de inicio y fin al momento de presionar el boton de enviar
  fechas_form: FormGroup;
  // estado del boton al iniciar la pagina
  submitted = false;
  respuesta: any;
  // array donde guardará otro array que es el de las fechas para que sea un objeto que contendrá un array
  objeto = {};
  public respuesta_servidor: boolean;
  // variable donde guarda el id de la sucursal a la que se enviará el plan de trabajo
  id_sucursal: any;
  // variable donde guarda el id supervisor
  id_supervisor: any;
  // variable donde guarda el id_plan de trabajo que la API me retorna
  id_plan_trabajo: any;
  // variable donde guardará la lista de prioridades que se usará en un select y de ahi sacar el ID de cada prioridad
  prioridades: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private navbar: NavbarComponent,
    public apiService: ApiService,
    private http: HttpClient
  ) {
    this.respuesta_servidor = true;
    // grupo donde contiene TODOS los campos
    this.apertura_form = this.formBuilder.group({
      id_prioridad: [],
      array_fechas_apertura: this.formBuilder.array([this.grupo_fechas()])
    });
  }

  ngOnInit() {
    this.cargar_plan_de_trabajo();
    // metodo para mostrar las prioridades en un select
    this.mostrar_prioridad();
    // console.log(this.route);
  }

  cargar_plan_de_trabajo() {
    // metodo para mostrar los parametros de id_sucursal y id_supervisor
    // para ser usado en el metodo de cargar_plan_de_trabajo
    this.route.params.subscribe(data => {
      this.http.post(`${this.apiService.ip}/supervisores_api/public/api/CrearPlanTrabajo`, data,
        {
          headers: this.apiService.headers_get
        }).subscribe(respuesta => {
          this.id_plan_trabajo = respuesta;
          console.log(this.id_plan_trabajo);
        });
    });
  }

  grupo_fechas() {
    return this.formBuilder.group({
      fecha_inicio: [],
      fecha_fin: []
    });
  }

  // metodo para consumir API de prioridades y mostrarmelas en un SELECT
  mostrar_prioridad() {
    this.navbar.mostrar_prioridad().subscribe(data => {
      this.prioridades = data['prioridades'];
      // console.log(this.prioridades);
    });
  }

  get array_fechas() {
    // retorna el array que agarra de apertura_form
    return <FormArray>this.apertura_form.get('array_fechas_apertura');
  }

  // ********** METODO PARA AGREGAR MAS FECHAS ****************
  agregar_fechas() {
    this.array_fechas.push(this.grupo_fechas());
  }

  // ********** METODO PARA ELIMINAR FECHAS *******************
  eliminar_fechas(index) {
    // validacion para que el usuario NO elimine el unico item que aparece siempre al inicio.
    // si hay mas de un elemento, entonces si puede eliminar, de lo contrario, si queda solo uno, ese no se elimina.
    if (this.array_fechas.length === 1) {
      alert('ése es el único item!');
    } else {
      this.array_fechas.removeAt(index);
    }
  }

  // metodo para simular un envio: nada mas muestra en la consola como quedará los datos antes de ser enviados
  submit_handler() {
    // se hace otro grupo para que agarre SOLO el array llamado "array_fechas_apertura"
    this.fechas_form = this.formBuilder.group({
      // este es un array que dentro del él hay otro array que es el de "array_fechas"
      // quedando asi como un objeto (eso lo agarra del metodo "get array_fechas")
      array_fechas_apertura: [this.array_fechas.value]
    });
    // en este console log es como si fuera la peticion POST a la API
    console.log(this.apertura_form.value);
    console.log(this.id_plan_trabajo);
  }

  // ********************************   metodo para enviar los datos a la API de CREAR APERTURA *********************************
  crear_actividad_apertura() {
    // se hace el POST a la API (Crear Apertura)
    this.http.post(
      `${this.apiService.ip}/supervisores_api/public/api/CrearActividadApertura`,
      this.apertura_form.value, { params: this.id_plan_trabajo, headers: this.apiService.headers_get, }
    ).subscribe(respuesta => {
      // si el usuario envia los datos de manera incompleta se notifica en un alert la descripcion del error
      // si la respuesta de parte del servidor es diferente a "actividad apertura creada".......
      if (!respuesta['succes']) {
        swal({
          title: 'Problemas con el envío',
          text: JSON.stringify(respuesta),
          type: 'warning'
        });
        console.log(respuesta);
      } else {
        // si esta todo correcto, se notifica en un alert que sus datos han sido enviados.
        // si no hace esto: pasa a error, donde habrá mas validaciones
        swal({
          title: 'Actividad Apertura',
          text: JSON.stringify(respuesta['succes']),
          type: 'success'
        }).then(result => {
          // para volver a la pagina anterior...
          // window.history.back();
          // para recargar pagina...
          // location.reload();
        });
        console.log(respuesta);
      }
    },
      error => {
        if (error.status === 400) {
          swal({
            title: 'Error ' + error.status + ': ' + JSON.stringify(error['statusText']),
            text: 'inconsistencia con las fechas, asegúrate que las fechas no sean de días antes del día actual.',
            type: 'error'
          });
          console.log(error);
        } else {
          swal({
            title: 'Datos no enviados',
            text: JSON.stringify(error),
            type: 'error'
          });
          console.log(error);
        }
      }
    );
  }
}
