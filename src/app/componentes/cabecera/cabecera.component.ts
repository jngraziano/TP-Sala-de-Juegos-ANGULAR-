import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
    navbarOpen = false;
  constructor() {
    this.navbarOpen = false;

   }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


  Desloguear()
  {
    localStorage.setItem('token', null);
  }

}
