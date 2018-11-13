import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// servicios
import { ApiService } from '../../servicios/dataApi/api.service';

// interfaces
import { ZonaInterface } from '../../models/zona';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  zonas: any;
  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.get_zona().subscribe(data => {
      console.log(data['Zonas']);
      this.zonas = data['Zonas'];
    });
  }

  ngOnInit() {}
}
