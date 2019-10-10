import { Component, OnInit,ElementRef } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';

import { FirebaseService } from '../../servicios/firebase.service';
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  listado:any;
  // usuarios:any=[];
  miJugadoresServicio:JugadoresService
  
    constructor(serviceJugadores:JugadoresService,private baseService:FirebaseService,
      private elementRef: ElementRef) {
      this.traigoUsuarios();
      this.miJugadoresServicio = serviceJugadores;

      
    }
    


  ngOnInit() {
  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'darkgrey';
 }


  TraerTodos(){
    //alert("totos");
    this.miJugadoresServicio.traertodos('jugadores/','todos').then(data=>{
      //console.info("jugadores listado",(data));
      this.listado= data;

    })
  }

  traigoUsuarios(){
    this.baseService.getItems("salaJuegos/Usuarios").then(users => {
      // setTimeout(() => this.spinner = false, 2000);
     
      // console.log(this.usuarios);
      // console.log(users);

      this.listado = users;

      // let usuarioLogueado = this.usuarios.find(elem => (elem.email == this.cuenta.email && elem.clave == this.cuenta.clave));
      // console.log(usuarioLogueado);
      // console.log(usuarioLogueado);
      // console.log(this.cuenta);
      
    });
  }
  
  // TraerGanadores(){
  //   this.miJugadoresServicio.traertodos('jugadores/','ganadores').then(data=>{
  //     //console.info("jugadores listado",(data));
  //     this.listado= data;

  //   })
  // }
  // TraerPerdedores(){
  //   this.miJugadoresServicio.traertodos('jugadores/','perdedores').then(data=>{
  //     //console.info("jugadores listado",(data));
  //     this.listado= data;

  //   })
  // }

}
