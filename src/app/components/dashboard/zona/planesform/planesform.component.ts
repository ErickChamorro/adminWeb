import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../servicios/dataApi/api.service';
import { HttpClient } from '@angular/common/http';
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
  planes_form: FormGroup;
  // variable donde guarda los campos que la actividad APERTURA necesita
  apertura_form: FormGroup;
  // variable donde guarda el id de la sucursal a la que se enviará el plan de trabajo
  id_sucursal: any;
  // variable donde guarda el id supervisor
  id_supervisor: any;
  // variable donde guarda el id_plan de trabajo que la API me retorna
  id_plan_trabajo: any;
  // variable donde guardará la lista de prioridades que se usará en un select y de ahi sacar el ID de cada prioridad
  prioridades: any;

  array_actividades = {};
  objeto = {};
  number: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private navbar: NavbarComponent,
    public apiService: ApiService,
    private http: HttpClient
  ) {
    // grupo donde contiene TODOS los campos
    this.planes_form = this.formBuilder.group({
      tipo_actividad: [],
      id_prioridad: [],
      array_fechas_apertura: this.formBuilder.array([this.grupo_fechas()])
    });
  }

  ngOnInit() {
    // metodo para mostrar las prioridades en un select
    this.mostrar_prioridad();
    // console.log(this.route);
    this.route.params.subscribe(res => {
      console.log(res['id_plan_trabajo']);
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
    this.apiService.mostrar_prioridad().subscribe(data => {
      this.prioridades = data['prioridades'];
      // console.log(this.prioridades);
    });
  }

  get actividad() {
    return this.planes_form.get('tipo_actividad');
  }

  get array_fechas() {
    // retorna el array que agarra de planes_form
    return <FormArray>this.planes_form.get('array_fechas_apertura');
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
    this.apertura_form = this.formBuilder.group({
      id_prioridad: [],
      array_fechas_apertura: [this.array_fechas]
    });
    if (this.actividad.value === 'apertura') {
      // this.crear_actividad_apertura();
      console.log(this.apertura_form.value);
    } else {
      alert('esa actividad....no existe');
    }
  }

  // ********************************   metodo para enviar los datos a la API de CREAR APERTURA *********************************
  crear_actividad_apertura() {
    // primero extrae el parametro donde esta el id plan trabajo que viene desde la pagina de zona component, necesario para hacer el POST
    this.route.params.subscribe(params => {
      this.id_plan_trabajo = params;
      // se hace el POST a la API (Crear Apertura)
      this.http.post(
        `${this.apiService.ip}/supervisores_api/public/api/CrearActividadApertura`,
        this.planes_form.value, { params: this.id_plan_trabajo, headers: this.apiService.headers_get, }
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
          // **********************  INSERCION DE LA ACTIVIDAD QUE SE VAYA A REALIZAR   **********************************
          // se agrupa en un array los campos que se va a enviar: tiene que ser el mismo nombre que en la base de datos
          this.array_actividades = [{
            id_prioridad: this.planes_form.value['id_prioridad'],
            nombre_tabla: this.planes_form.value['tipo_actividad'],
            nombre_actividad: 'Apertura'
          }];
          // se crea el objeto final donde reunirá todos los campos
          this.objeto = {
            id_plan_trabajo: this.id_plan_trabajo['id_plan_trabajo'],
            array_actividades: this.array_actividades
          };
          // finalmente *****************   POST DE LA INSERCION   ************************************
          this.http.post(`${this.apiService.ip}/supervisores_api/public/api/InsercionTablaActividad`,
            this.objeto, { headers: this.navbar.headers }
          ).subscribe(res => {
            console.log(res);
            console.log(this.objeto);
            const mensaje = JSON.stringify(respuesta['succes']);
            const mensaje_insercion = JSON.stringify(res['message ']);
            // si esta todo correcto, se notifica en un alert que sus datos han sido enviados.
            // si no hace esto: pasa a error, donde habrá mas validaciones sobre el status del error.
            swal({
              title: 'Plan de trabajo creado exitosamente',
              // text: mensaje + mensaje_insercion,
              type: 'success'
            }).then(result => {
              // para volver a la pagina anterior...
              window.history.back();
              // para recargar pagina...
              // location.reload();
            });
            // console.log(respuesta);
          });
        }
      },
        error => {
          if (error.status === 400) {
            const mensaje = JSON.stringify(error['statusText']);
            swal({
              title: 'Error ' + error.status + ': ' + JSON.stringify(error['statusText']),
              text: mensaje,
              type: 'error'
            });
            console.log(error);
          } else {
            swal({
              title: 'Datos no enviados',
              text: JSON.stringify(error['error']['message']),
              type: 'error'
            });
            console.log(error);
          }
        }
      );
    });
  }
}
