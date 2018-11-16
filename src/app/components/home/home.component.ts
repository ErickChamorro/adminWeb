import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { ApiService } from '../../servicios/dataApi/api.service';
import { CoordinadorInterface } from '../../models/coordinador';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ip = 'http://192.168.1.4'; // servidor SENTOS
  // ip = 'http://192.168.1.64';    // servidor cudris
  loginForm: FormGroup;
  submitted = false;
  respuesta: any;
  public respuesta_servidor: boolean;
  disabled: boolean;
  data: any;
  usuario_coordinador: CoordinadorInterface;

  datos_nombre_coordinador: any;
  datos_apellido_coordinador: any;
  datos_region_coordinador: any;
  current_user: any;

  constructor(
    private formBuilder: FormBuilder,
    public http: HttpClient,
    public location: Location,
    public router: Router,
    private apiService: ApiService
  ) {
    // extrae las propiedades de la interface de coordinador para usarla en el proceso de logado
    this.usuario_coordinador = {
      apellido: '',
      id_cordinador: 0,
      id_region: 0,
      nombre: '',
      region: ''
    };

    this.respuesta_servidor = true;

    // validador del formulario de login
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
      ]
    });
  }

  ngOnInit() {
    // para desactivar el boton al cargar la pagina
    // despues se pondrá en true hasta que los datos que se haya llenado en el formulario sean validos
    this.disabled = true;
  }

  // accede a los controles de loginform
  get form() {
    return this.loginForm.controls;
  }

  // metodo que se ejecuta al presionar el boton de iniciar en el HTML
  // *******************************      LOGIN (el LOGOUT está en navbar.component.ts )       *************************
  iniciarSesion() {
    this.submitted = true;

    // se volvera desactivar el boton para prevenir que el usuario clickee mas de una vez
    this.disabled = true;

    // si formulario es invalido
    if (this.loginForm.invalid) {
      // opcional si se quiere poner un SWEETALERT o dejar el alert ordinario
      alert('aqui falta algo...');
      return;
    }

    // hacer el post al api para comprobar que usuario existe para recibir el TOKEN
    this.http
      .post(
        `${this.ip}/supervisores_api/public/api/login`,
        // parametros extraidos del HTML
        JSON.stringify(this.loginForm.value),
        {
          headers: new HttpHeaders({
            Authorization: 'Access',
            'Content-Type': 'application/json'
          })
        }
      )
      .subscribe(
        data => {
          // variable que guarda el dato del token que recibió de la respuesta del servidor
          const token = data['access_token'];
          // se debe asignar al local Storage el token para que se use después...
          localStorage.setItem('token', token);
          // usar la siguiente api para que usuario acceda al dashboard segun sea su rol
          // para eso se debe tener el token que está guardado en el Local Storage
          this.apiService.get_coordinador_y_zona().subscribe(datos => {
            // AQUI SE TIENE QUE VALIDAR SI EL USUARIO ES COORDINADOR, ADMINISTRADOR O SUPERVISOR
            // HASTA AHORA NADA MAS SE INGRESA SIN VALIDAR, PERO SI NO ES COORDINADOR MANDA UNA ALERTA DE ERROR
            this.router.navigate(['/dashboard']);
            this.current_user = datos['region']['nombre'];
            localStorage.setItem('CurrentUser', this.current_user);
          });
        },
        // *****************************    GESTION DE ERRORES   *****************************************
        error => {
          // PARA ERROR CON STATUS 500: INTERNAL SERVER ERROR (error interno del servidor)
          if (error.status === 500) {
            swal({
              title: 'Error',
              text: 'Error interno del servidor. (internal server) Error: ',
              type: 'error'
            });
            localStorage.clear();
            console.log('un error 500: (error interno del servidor)');
          } // PARA ERROR 404: PAGE NOT FOUND (PAGINA NO ENCONTRADA)
          if (error.status === 404) {
            // para éste no mostrará error en ninguna parte, solo redirigirá a una pagina diseñada para ésto
            this.router.navigate(['/error/404']);
          }
          // ERROR 401: UNAUTHORIZED (NO AUTORIZADO)
          if (error.status === 401) {
            swal({
              title: 'Error',
              text: 'Usuario y/o contraseña incorrectos.',
              type: 'error'
            });
            console.log('un error 401 (no autorizado)');
          } else {
            swal({
              title: 'Error',
              text: 'Algo raro pasa... ',
              type: 'error'
            });
            // console.log(JSON.stringify(error));
          }
        }
      );
  }

  // metodo que se cumple al presionar el boton de "olvide mi contraseña"
  olvide_mi_contrasenia() {
    swal({
      title: 'Reestablecer contraseña',
      text:
        'paso 1: ingrese su correo electronico para mandarte la nueva contraseña, después podras iniciar sesion nuevamente.',
      input: 'text',
      inputPlaceholder: 'Dirección de correo eléctronico',
      padding: 70,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      allowOutsideClick: false
    }).then(result => {
      if (result.value) {
        swal({
          title: 'Exito',
          text: `se ha enviado la peticion a: ${result.value}`,
          type: 'success'
        });
      }
    });
  }
}
