import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planesform',
  templateUrl: './planesform.component.html',
  styleUrls: ['./planesform.component.css']
})
export class PlanesformComponent implements OnInit {
  disableSelectUno = new FormControl(false);
  disableSelectDos = new FormControl(false);
  disableSelectTres = new FormControl(false);
  constructor(private router: Router) {}

  ngOnInit() {}

  enviar_plan() {
    swal({
      title: 'Exito',
      text: 'Plan de trabajo asignado exitósamente',
      type: 'success'
    }).then(result => {
      window.history.back();
    });
  }
}
