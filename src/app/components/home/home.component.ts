import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

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

  constructor(
    private formBuilder: FormBuilder,
    public http: HttpClient,
    public location: Location,
    public router: Router,
    route: ActivatedRoute
  ) {
    this.respuesta_servidor = true;

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
      ]
    });
  }

  ngOnInit() {
    // para desacivar el boton al cargar la pagina
    this.disabled = true;
  }
  get form() {
    return this.loginForm.controls;
  }

  iniciarSesion() {
    this.submitted = true;
    this.disabled = true;

    // si formulario es invalido
    if (this.loginForm.invalid) {
      alert('aqui falta algo...');
      return;
    }

    this.http
      .post(
        'http://192.168.1.64/supervisores_api/public/api/login',
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
          const token = data['access_token'];
          localStorage.setItem('token', token);
          this.http
            .get('http://192.168.1.64/supervisores_api/public/api/dashboard', {
              headers: new HttpHeaders({
                Accept: 'application/json',
                Authorization: 'Bearer' + ' ' + localStorage.getItem('token')
              })
            })
            .subscribe(textos => {
              console.log(textos);
              if (textos !== 'ruta/coordinadores') {
                this.router.navigate(['/error/error401']);
              } else {
                this.router.navigate(['/dashboard']);
                console.log('bienvenido coordinador');
              }
            });
          // console.log('POST request is successfull', data);
          // console.log('status: ', status);
          // this.respuesta = data;
          // this.respuesta_servidor = false;
        },
        error => {
          if (error.status === 500) {
            swal({
              title: 'Error',
              text:
                'Error interno del servidor. (internal server) Error: ' +
                JSON.stringify(error.status),
              type: 'error'
            });
            localStorage.clear();
            console.log(error);
          }
          if (error.status === 401) {
            swal({
              title: 'Error',
              text:
                'Usuario y/o contraseña incorrectos. Error: ' + error.status,
              type: 'error'
            });
            console.log('un 401');
          } else {
            swal({
              title: 'Error',
              text: 'Algo raro pasa... ' + JSON.stringify(error),
              type: 'error'
            });
            console.log(
              'algo pasa con el servidor de alguien...',
              JSON.stringify(error)
            );
          }
        }
      );
  }

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
