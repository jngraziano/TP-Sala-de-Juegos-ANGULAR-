import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
    navbarOpen = false;
  

  constructor(router: Router) {
    this.navbarOpen = false;

   }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


  Desloguear()
  {
    // localStorage.setItem('token', null);
    // this.router.navigateByUrl('/Login'); 
  }

}
