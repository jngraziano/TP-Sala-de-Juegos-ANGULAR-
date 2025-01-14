import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
  }
  Juego(tipo: string) {
    switch (tipo) {
      case 'Adivina':
          this.router.navigate(['/Juegos/Adivina']);
        break;
      case 'Agilidad':
          this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 'AdivinaMasListado':
          this.router.navigate(['/Juegos/AdivinaMasListado']);
        break;
      case 'AgilidadMasListado':
          this.router.navigate(['/Juegos/AgilidadMasListado']);
        break;
      case 'MayorOMenor':
        this.router.navigate(['/Juegos/MayorOMenor']);
      break; 
      case 'PPT':
        this.router.navigate(['/Juegos/PPT']);
      break; 
      case 'Ahorcado':
        this.router.navigate(['/Juegos/Ahorcado']);
      break;
      case 'Anagrama':
        this.router.navigate(['/Juegos/Anagrama']);
      break;
    }
  }
}
