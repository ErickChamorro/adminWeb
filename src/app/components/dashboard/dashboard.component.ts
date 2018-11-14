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
  constructor(private apiService: ApiService) {
    this.apiService.get_zona().subscribe(data => {
      this.zonas = data['Zonas'];
      console.log(data['Zonas']);
    });
  }

  ngOnInit() {}
}
