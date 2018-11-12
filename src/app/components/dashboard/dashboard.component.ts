import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public navbarComponent: NavbarComponent) { }

  ngOnInit() {
  }

  togglear() {
    this.navbarComponent.togglear_sidebar();
  }

}
