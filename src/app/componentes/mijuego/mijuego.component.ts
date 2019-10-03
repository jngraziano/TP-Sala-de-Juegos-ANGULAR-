import { Component, OnInit } from '@angular/core';

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
   


  constructor() { 
    
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
      if (!this.palabraMostrar.includes('_')) {
          // alert('Has ganado!!!');
          
          setTimeout(function() {  location.reload(true); }, 3000);
          this.gano = true;
          // Refrescamos la página para volver a jugar
         
      }
      // Ha perdido: ¿Tiene 0 intentos?
      if (this.intentos == 0) {
          // alert('Has Perdido!!! Era: ' + this.palabraAdivinar.join(''));
          setTimeout(function() { location.reload(true); }, 3000);
          this.perdio = true;
          // Refrescamos la página para volver a jugar
          
      }
  }

//   //======================================================================
//   // EVENTOS
//   //======================================================================
//   // Al hacer clic en el boton se llama la funcion comprobarLetraUsuario
    // nodoBoton.addEventListener('click', comprobarLetraUsuario);
//   // Al hacer Enter con el teclado se llama a la funcion comprobarLetraUsuario
    // nodoLetra.addEventListener('keyup', comprobarPulsadoEnter);

//   //======================================================================
//   // INICIO
//   //======================================================================
 
// });

}
