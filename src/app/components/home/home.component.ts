import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public navbarComponent: NavbarComponent) { }

  ngOnInit() {
  }

  toggler() {
    this.navbarComponent.togglear_sidebar();
  }

}
