import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// servicios
import { ApiService } from '../../../servicios/dataApi/api.service';
import { ZonaInterface } from '../../../models/zona';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.css']
})
export class ZonaComponent implements OnInit {
  sucursales: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    // this.apiService.get_detalle_zona(this.id_zona).subscribe(data => {
    //   console.log(data);
    // });
  }

  ngOnInit() {
    this.listar_droguerias();
  }

  listar_droguerias() {
    this.route.params.subscribe(data => {
      this.apiService.get_detalle_zona(data['id']).subscribe(sucursales => {
        this.sucursales = sucursales['sucursal'];
        console.log(sucursales['sucursal']);
      });
    });
    // console.log(this.apiService.get_detalle_zona(this.id_sucursales));
  }
}
