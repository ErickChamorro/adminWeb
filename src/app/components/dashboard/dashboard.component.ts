import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public navbarComponent: NavbarComponent) {}

  ngOnInit() {
    this.togglear_sidebar();
  }

  togglear_sidebar() {
    $('#sidebarCollapse').on('click', function() {
      $('#sidebar, #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
  }
}
