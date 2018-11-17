import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-planesform',
  templateUrl: './planesform.component.html',
  styleUrls: ['./planesform.component.css']
})
export class PlanesformComponent implements OnInit {
  disableSelect = new FormControl(false);
  constructor() {}

  ngOnInit() {}
}
