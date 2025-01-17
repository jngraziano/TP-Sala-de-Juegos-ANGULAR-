import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FirebaseService } from '../../servicios/firebase.service';


import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
 
  usuarios:any [];
  cuenta: { email: string, clave: string } = {
    email: 'usuario@gmail.com',
    clave: '1234'
  };
  // mail = '';
  // clave= '';
  // listaUsuarios
  // progreso: number;
  // progresoMensaje="esperando..."; 
  logeando=true;
  ProgresoDeAncho:string;
  public error: boolean = false;
  public success: boolean = false;

  // clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private baseService:FirebaseService,
    private route: ActivatedRoute,
    private router: Router) {
      // this.progreso=0;
      // this.ProgresoDeAncho="0%";

  }

  ngOnInit() {
  }

  // Entrar() {
  //   if (this.usuario === 'admin' && this.clave === 'admin') {
  //     this.router.navigate(['/Principal']);
  //   }
  // }
  // MoverBarraDeProgreso() {
    
  //   this.logeando=false;
  //   this.clase="progress-bar progress-bar-danger progress-bar-striped active";
  //   this.progresoMensaje="NSA spy..."; 
  //   let timer = TimerObservable.create(200, 50);
  //   this.subscription = timer.subscribe(t => {
  //     console.log("inicio");
  //     this.progreso=this.progreso+1;
  //     this.ProgresoDeAncho=this.progreso+20+"%";
  //     switch (this.progreso) {
  //       case 15:
  //       this.clase="progress-bar progress-bar-warning progress-bar-striped active";
  //       this.progresoMensaje="Verificando ADN..."; 
  //         break;
  //       case 30:
  //         this.clase="progress-bar progress-bar-Info progress-bar-striped active";
  //         this.progresoMensaje="Adjustando encriptación.."; 
  //         break;
  //         case 60:
  //         this.clase="progress-bar progress-bar-success progress-bar-striped active";
  //         this.progresoMensaje="Recompilando Info del dispositivo..";
  //         break;
  //         case 75:
  //         this.clase="progress-bar progress-bar-success progress-bar-striped active";
  //         this.progresoMensaje="Recompilando claves facebook, gmail, chats..";
  //         break;
  //         case 85:
  //         this.clase="progress-bar progress-bar-success progress-bar-striped active";
  //         this.progresoMensaje="Instalando KeyLogger..";
  //         break;
          
  //       case 100:
  //         console.log("final");
  //         this.subscription.unsubscribe();
  //         this.Entrar();
  //         break;
  //     }     
  //   });
  //   //this.logeando=true;
  // }



  login(){
    // this.spinner = true; 
    this.baseService.getItems("salaJuegos/Usuarios").then(users => {
      // setTimeout(() => this.spinner = false, 2000);
     
      // console.log(this.usuarios);
      // console.log(users);

      this.usuarios = users;

      let usuarioLogueado = this.usuarios.find(elem => (elem.email == this.cuenta.email && elem.clave == this.cuenta.clave));
      console.log(usuarioLogueado);
      // console.log(usuarioLogueado);
      // console.log(this.cuenta);
      if (usuarioLogueado !== undefined) {
        this.error = false;
        this.success = true;
        sessionStorage.setItem('Usuarios', JSON.stringify(usuarioLogueado));

        // this.events.publish('usuarioLogueado', usuarioLogueado.perfil);       
        // this.creoToast(true);
        
        this.router.navigateByUrl('/Principal'); 
      }
      else{
        this.error = true;
      }
    });
  }

}
