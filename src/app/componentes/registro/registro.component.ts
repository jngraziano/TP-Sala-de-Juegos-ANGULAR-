import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FirebaseService } from '../../servicios/firebase.service';
// import {  } from "..";
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

 /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/
  listadoUsuarios:any=[];

  public usuario  =
  {
    "email" : "",
    "password" : "",
    "passwordR" : ""


  }
   error: boolean = false;
   errorP: boolean = false;
   success: boolean = false;
  constructor(private baseService:FirebaseService ) {

   }

  ngOnInit() {
  }

  registrarme(){

    if(this.usuario.password != this.usuario.passwordR)
    {
      this.errorP = true;
    }
    else{
      this.errorP = false;
    }
  
    this.baseService.getItems("salaJuegos/Usuarios").then(users => {
     
      this.listadoUsuarios = users;

      let usuarioLogueado = this.listadoUsuarios.find(elem => (elem.email == this.usuario.email));
      console.log(usuarioLogueado);
   
      if (usuarioLogueado !== undefined) {
        this.error = true;
      
        
      }
      else{
        this.error = false;
        let usuarioCargar = {
          "email":this.usuario.email,
          "clave":this.usuario.password
        }
        this.baseService.addItem('salaJuegos/Usuarios', usuarioCargar); 
        this.usuario.email= "";
        this.usuario.password= "";
        this.usuario.passwordR= "";

        this.success = true;
      }
  
  
  });
  
  }
  

}
