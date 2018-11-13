import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/dataApi/api.service';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent implements OnInit {
  zonas: any;
  constructor(private apiService: ApiService) {
    this.apiService.get_zona().subscribe(data => {
      console.log(data['Zonas']);
      this.zonas = data['Zonas'];
    });
  }

  ngOnInit() {}
}
