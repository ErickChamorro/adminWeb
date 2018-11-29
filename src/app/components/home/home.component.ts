import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoordinadorInterface } from '../../models/coordinador';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ApiService } from '../../servicios/dataApi/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  respuesta: any;
  public respuesta_servidor: boolean;
  disabled: boolean;
  data: any;
  usuario_coordinador: CoordinadorInterface;
  current_user: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public location: Location,
    public router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
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

    // AL INICIAR LA PAGINA SE CARGA ESTE SPINNER PRIMERO, DESPUES SE CARGA EL LOGIN
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    // validar que la persona esté logeada para no tener que volver a iniciar sesion en caso de que perdio la sesion,
    // y todavia conserva el token
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    } else {

    }

  }

  // accede a los controles de loginform
  get form() {
    return this.loginForm.controls;
  }

  // manejador de envios: muestra en consola como sera enviado los datos
  submit_handler() {
    console.log(this.loginForm.value);
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

    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */

      // hacer el post al api para comprobar que usuario existe para recibir el TOKEN
      this.http.post(
        `${this.apiService.ip}/supervisores_api/public/api/login`,
        // parametros extraidos del HTML
        JSON.stringify(this.loginForm.value),
        { headers: this.apiService.headers_post }
      )
        .subscribe(
          data => {
            // variable que guarda el dato del token que recibió de la respuesta del servidor
            const token = data['access_token'];
            // se debe asignar al local Storage el token para que se use después...
            localStorage.setItem('token', token);
            // AQUI SE TIENE QUE VALIDAR SI EL USUARIO ES COORDINADOR, ADMINISTRADOR O SUPERVISOR
            // HASTA AHORA NADA MAS SE INGRESA SIN VALIDAR, PERO SI NO ES COORDINADOR MANDA UNA ALERTA DE ERROR
            this.router.navigate(['/dashboard']);
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
            } else if (error.status === 404) {
              // para éste no mostrará error en ninguna parte, solo redirigirá a una pagina diseñada para ésto
              this.router.navigate(['/error/404']);
            } else if (error.status === 401) {
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
      this.spinner.hide();
    }, 1500);
  }
  // metodo que se cumple al presionar el boton de "olvide mi contraseña"
  olvide_mi_contrasenia() {
    swal({
      title: 'Reestablecer contraseña',
      text:
        'Ingrese su correo electrónico para gestionar una nueva contraseña, después podrás iniciar sesión nuevamente.',
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
