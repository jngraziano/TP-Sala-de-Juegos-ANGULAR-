import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
    navbarOpen = false;
    usuarioLogueado:any;
    usuarioLOG:boolean = false;
    usuarioNologeado:boolean = true;


  constructor(private router: Router) {
    this.navbarOpen = false;
    this.usuarioLogueado = JSON.parse(sessionStorage.getItem('Usuarios'));
    if(this.usuarioLogueado != undefined)
    {
      this.usuarioNologeado = false;
      this.usuarioLOG = true;
    }
    else{
      this.usuarioNologeado = true;
      this.usuarioLOG = false;
    }

   }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


  deslog()
  {
    sessionStorage.setItem('Usuarios', null);
    this.router.navigateByUrl('/Login'); 

  }

}
