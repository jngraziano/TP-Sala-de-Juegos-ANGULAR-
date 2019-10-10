
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
 @Input()
 listado: Array<any>;
 listadoAhorcado: any;
 listadoAgilidad: any;
 listadoPPT:any;
 listadoAdivina:any;


  constructor(private baseService:FirebaseService) {
    this.inicializoListados();
   }

  ngOnInit() {

  }

  inicializoListados(){



    this.baseService.getItems("salaJuegos/ahorcado").then(ahorcadoDatos => {

      this.listadoAhorcado = ahorcadoDatos;
     
  
    });
    this.baseService.getItems("salaJuegos/agilidad").then(agilidadDatos => {

      this.listadoAgilidad = agilidadDatos;
     
  
    });
    this.baseService.getItems("salaJuegos/ppt").then(pptDatos => {

      this.listadoPPT = pptDatos;
     
  
    });
    this.baseService.getItems("salaJuegos/adivina").then(adivinaDatos => {

      this.listadoAdivina = adivinaDatos;
     
  
    });
  }

  ver() {
    console.info(this.listado);
  }

}
