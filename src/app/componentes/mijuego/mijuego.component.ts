import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-mijuego',
  templateUrl: './mijuego.component.html',
  styleUrls: ['./mijuego.component.css']
})
export class MijuegoComponent implements OnInit {

    listaPalabras = ['CANIGGIA', 'MARADONA', 'MESSI', 'AGUERO', 'CENTURION'];
    palabraAdivinar = [];
    palabraMostrar = [];
    historialLetrasUsuario = [];
    aciertos:number = 0;
    mAciertos:boolean = false;
    ahorcadoDatos:any [];
   
    nodoHistorial:string;
    intentos:number = 5;
    letra:string;
    resultado:string;
    historial = [];

    gano:boolean = false;
    perdio:boolean = false;

    futbolista = {
      imageUrl : ""
    }
   
    usuarioLogueado: any;
    usuarioLogeadoAhorcado: any;


  constructor(private baseService:FirebaseService) { 
    this.usuarioLogueado = JSON.parse(sessionStorage.getItem('Usuarios'));
    this.checkAciertos();
   
  }

  ngOnInit() {
    this.prepararJuego(); 
  }

  //======================================================================


    /**
     * Método que prepara el juego para iniciarse
     */
    prepararJuego () {
      //// 1 Selecciono una palabra aleatoria de listaPalabra
      //// 1.1 Obtengo la posicion aleatoria
      let posAleatoriaListaPalabras = Math.floor(Math.random() * this.listaPalabras.length);
      // let posAleatoriaListaPalabras = 3;
      // console.log(posAleatoriaListaPalabras);
      //// 1.2 Obtengo la palabra aleatoria
      let palabraAleatoria = this.listaPalabras[posAleatoriaListaPalabras];
      switch (palabraAleatoria) {
        case "CANIGGIA":
          this.futbolista.imageUrl = "./assets/imagenes/caniggia.jpg";
          break;
        case "MESSI":
          this.futbolista.imageUrl = "./assets/imagenes/messi.jpg";
        break;
        case "MARADONA":
          this.futbolista.imageUrl = "./assets/imagenes/maradona.png";      
        break;
        case "AGUERO":
            this.futbolista.imageUrl = "./assets/imagenes/aguero.jpg";
        break;
        case "CENTURION":
            this.futbolista.imageUrl = "./assets/imagenes/centurion.jpg";
        break;
      
        default:
          break;
      }
      console.log(palabraAleatoria);

      //// 1.3 Separo la palabra en letras y lo guardo
      this.palabraAdivinar = palabraAleatoria.split('');
      //// 2 Preparo el array que va a ver el usuario. Tendrá el mismo número de guiones que letras en palabraAdivinar
      for (let letra of this.palabraAdivinar) {
          this.palabraMostrar.push('_');
          
      }
      console.log(this.palabraMostrar);
      //// 3 Dibuja todo lo necesario
      this.dibujarJuego();
  }

  /**
   * Método que redibuja lo que ve el usuario con los cambios
   */
   dibujarJuego () {
      // Convertimos un array en un texto, separado por espacios, y lo mostramos en el div resultado
      this.resultado = this.palabraMostrar.join(' ');
      // Mostramos los intentos
      // this.intentos = this.numIntentos;
      // Mostramos el historial de letras
      this.historial.push(this.historialLetrasUsuario.join(' '));
  }

//   /**
//    * Método que comprueba la letra que ha introducido el usuario
//    */
   comprobarLetraUsuario () {
      //// 1 Sustituye los guiones por la letra acertada
      // Guardo la letra del input que ha escrito el usuario en una variable
      let letraUsuario = this.letra.toUpperCase();
      // Vaciamos el input para que el usuario pueda volver a escribir
      this.letra = '';
     
      // Le devolvemos el foco al input para que pueda introducir otra letra
      // this.letra.focus();
      // Recorremos todas las letras para saber si alguna esta bien

    // if(this.palabraAdivinar.indexOf(letraUsuario) != -1)
    // {
    //   console.log(this.palabraAdivinar.indexOf(letraUsuario) != -1);
    //   // console.log( this.palabraMostrar);
    //   for (let index = 0; index < this.palabraMostrar.length; index++) {
    //     // if()
    //     this.palabraMostrar[index] = letraUsuario;
        
    //   }

    // }

    if(this.palabraAdivinar.indexOf(letraUsuario) != -1) {
      for(var i=0; i<this.palabraAdivinar.length; i++) {
          if(this.palabraAdivinar[i]==letraUsuario) this.palabraMostrar[i] = letraUsuario;
          console.log(this.palabraMostrar);
      }
      this.historial.push(letraUsuario);
     
      // letter_space.innerHTML = hidden_letter.join("");
      // document.getElementById(letter).classList.add("letter-correct");
  }
  else {
    this.intentos -= 1;
    this.historial.push(letraUsuario);

  }

//       //// 2 Comprobamos si se ha equivocado
//       // ¿No esta la letra?

//       //// 3 Comprobamos si hay que terminar el juego
      this.acabarJuego();
//       //// 4 Mostramos los cambios
     this.dibujarJuego();
  }

//   /**
//    * Método que comprueba si se ha pulsado la tecla Enter
//    */
   comprobarPulsadoEnter (evento) {
      if (evento.code == 'Enter') {
          this.comprobarLetraUsuario();
      }
  }

//   /**
//    * Método que verifica si se ha acabado el juego
//    */
   acabarJuego () {
      // Ha ganado: ¿Le queda guiones al jugador?

    //   this.baseService.getItems("salaJuegos/ahorcado").then(ahorcadoDatos => {

    //     this.ahorcadoDatos = ahorcadoDatos;
       

    //     let usuarioConDatos = this.ahorcadoDatos.find(elem => (elem.email == this.usuarioLogueado.email ));

    //     if (usuarioConDatos !== undefined) {
    //      this.aciertos = usuarioConDatos.valor;
        

    //     }


    // });
      if (!this.palabraMostrar.includes('_')) {
          // alert('Has ganado!!!');
          
          // setTimeout(function() {  location.reload(true); }, 3000);
          this.aciertos=this.aciertos+1;
          this.mAciertos = true;
          this.gano = true;

           let usuarioValor = {
            "email": this.usuarioLogueado.email,
            "valor": this.aciertos,

          }
          let usuarioValorUpdate = {
            "valor": this.aciertos,

          }

          // this.baseService.addItem('salaJuegos/ahorcado', usuarioValor);  
          this.baseService.updateItem('salaJuegos/ahorcado', this.usuarioLogueado.key, usuarioValor);  
      
         
      }
      // Ha perdido: ¿Tiene 0 intentos?
      if (this.intentos == 0) {
          // alert('Has Perdido!!! Era: ' + this.palabraAdivinar.join(''));
          // setTimeout(function() { location.reload(true); }, 3000);
          this.perdio = true;
          // Refrescamos la página para volver a jugar
          
      }
  }

checkAciertos(){

  
  this.baseService.getItems("salaJuegos/ahorcado").then(ahorcadoDatos => {

    this.ahorcadoDatos = ahorcadoDatos;
   

    let usuarioConDatos = this.ahorcadoDatos.find(elem => (elem.email == this.usuarioLogueado.email ));

    if (usuarioConDatos !== undefined) {
    //  sessionStorage.setItem("Usuarios",JSON.stringify(usuarioConDatos))
     this.aciertos = usuarioConDatos.valor;
      // let objetoEnviarOtraCarga = {
      //   "codigo": this.datosEscaneados.text,
      //   "usuario": usuarioLogueado.correo,
      //   "carga": this.cargaAux,
      //   "cargaTotal": this.cargaTotal

      // }
      // this.baseService.addItem('cargaCredito', objetoEnviarOtraCarga);  

    }


});

}

}
