import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( public router: Router, route: ActivatedRoute) { }

  ngOnInit() {
    this.togglear_sidebar();
  }
  togglear_sidebar() {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
  }

  inicio() {
    this.router.navigate(['']);
  }

  dashboard() {
    this.router.navigate(['dashboard']);
  }

}
