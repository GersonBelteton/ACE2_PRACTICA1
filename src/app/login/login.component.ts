import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UsuarioService} from './../service/usuario.service'
//JQUERY
declare var $:any;
//SWAL
declare var swal:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent implements OnInit {


  dtincorrectos:boolean = false;

  formData:FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required])
  });
  formRecovery:FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required])
  });
  
  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  logIn() {
    console.log(this.email?.value)
    console.log(this.password?.value)
    let loginParams:Login={
      username:this.email?.value,
      pass:this.password?.value
    }
      console.log(loginParams)
      this.usuarioService.auth(loginParams)
      .subscribe(res => {
        console.log(res)
        localStorage.setItem("currentId", res.id);
        localStorage.setItem("currentNombre", res.nombres + " " + res.apellidos);
        localStorage.setItem("currentType", res.tipo_usuario)
        localStorage.setItem("idAtletaCoach", "0")
        location.href = '/perfil'
        
      }, error => {
        console.log('hay un error :(')
        this.dtincorrectos = true
        console.log(error)
      })
    
    
  }

  recovery() {}

  /**
   * ABRIR VISTA RECOVERY
   */
  openRecovery = () => {
    $("#loginform").slideUp();
    $("#recoverform").fadeIn();
  }
  
  /**
   * ABRIR VISTA INICIO SESION
   */
  iniciarSesion= () => {
    $("#recoverform").slideUp();
    $("#loginform").fadeIn();
  }

  get email() { return this.formData.get('email'); }
  get password() { return this.formData.get('password'); }
  get correo() { return this.formRecovery.get('email'); }

}

interface Login{
  username: String;
  pass: String;
}

