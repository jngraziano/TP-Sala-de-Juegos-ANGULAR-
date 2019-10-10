  import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
  import {JuegoPiedraPapelTijera} from "../../clases/juego-piedra-papel-tijera";
  import { FirebaseService } from '../../servicios/firebase.service';


@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {

  @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();
  nuevoPpt:JuegoPiedraPapelTijera;
  seleccionUsuario:string;
  seleccionPc:string;
  puntosUsuario=0;
  puntosPc=0;
  mensaje:string=" ";

  aciertos:number=0;
  pptDatos:any [];
  usuarioLogueado: any;

  constructor(private baseService:FirebaseService) {
    this.usuarioLogueado = JSON.parse(sessionStorage.getItem('Usuarios'));
    this.checkAciertos();
    this.nuevoPpt=new JuegoPiedraPapelTijera()
   }

  ngOnInit() {
  }

  public Jugar(seleccion)
   {
     if(!this.nuevoPpt.verificar())
     {
      this.seleccionUsuario=seleccion;
      this.nuevoPpt.Jugar(seleccion);
      this.puntosPc=this.nuevoPpt.puntosPc;
      this.puntosUsuario=this.nuevoPpt.puntosJugador;
      this.seleccionPc=this.nuevoPpt.seleccionPc;

      if(this.nuevoPpt.verificar())
      {
        this.TerminarJuego();
      }
     }
     else
     {
       this.mensaje="Juego Terminado. Volve a empezar para seguir jugando."
     }
      
   }
 
   public NuevoJuego()
   {
     this.nuevoPpt= new JuegoPiedraPapelTijera();
     this.puntosPc=this.nuevoPpt.puntosPc;
     this.puntosUsuario=this.nuevoPpt.puntosJugador;
     this.mensaje=" ";
     this.seleccionUsuario="";
     this.seleccionPc="";
   }

   private TerminarJuego(){
    console.log("Estoy en terminar juego", this.nuevoPpt);
    this.enviarJuego.emit(this.nuevoPpt);
    if(this.nuevoPpt.gano)
    {
      this.aciertos=this.aciertos+1;
      let usuarioValor = {
       "email": this.usuarioLogueado.email,
       "valor": this.aciertos,

     }
    

     // this.baseService.addItem('salaJuegos/ahorcado', usuarioValor);  
     this.baseService.updateItem('salaJuegos/ppt', this.usuarioLogueado.key, usuarioValor);  
      this.mensaje="¡¡¡Ganaste!!! Aciertos: "+this.aciertos;
    }
    else{
      this.mensaje="¡¡Perdiste!! Seguí participando...";
    }
   }

   checkAciertos(){

  
    this.baseService.getItems("salaJuegos/ppt").then(pptDatos => {
  
      this.pptDatos = pptDatos;
     
  
      let usuarioConDatos = this.pptDatos.find(elem => (elem.email == this.usuarioLogueado.email ));
  
      if (usuarioConDatos !== undefined) {
       this.aciertos = usuarioConDatos.valor;
      
  
      }
  
  
  });
  
  }

}
