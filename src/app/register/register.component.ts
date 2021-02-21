import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UsuarioService} from '../service/usuario.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData:FormGroup = new FormGroup({
    'nombre': new FormControl('', [Validators.required]),
    'apellido': new FormControl('', [Validators.required]),
    'edad': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required]),
    'est': new FormControl('', [Validators.required]),
    'peso': new FormControl('', [Validators.required]),
    'sexo': new FormControl('',[Validators.required]),
    'tipo': new FormControl('',[Validators.required]),
    'estado': new FormControl('2'),
    'id_usuarios_tipos': new FormControl('2'),
    'descripcion': new FormControl('Cliente'),
    'fechahora':new FormControl(Date.now()), 
  });

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    
  ) { }

  ngOnInit(): void {
  }

  registro() {

    let userParams:User={
      nombres:this.nombre?.value,
      apellidos:this.apellido?.value,
      username:this.email?.value,
      pass:this.password?.value,
      edad:this.edad?.value,
      sexo:this.sexo?.value,
      peso:this.peso?.value,
      estatura:this.est?.value,
      tipo:Number(this.tipo?.value),
    }

    
    console.log(userParams)


    this.usuarioService.create(userParams).subscribe(
      res =>{
         console.log(res);
         //localStorage.setItem("sesion",JSON.stringify(userParams)) 
         //location.href = '/user'
         location.href = '/login'
      },
      err => console.error(err)
     );
     //location.href = ''
  }

  get nombre() { return this.formData.get('nombre'); }
  get apellido() { return this.formData.get('apellido'); }
  get edad() { return this.formData.get('edad'); }
  get email() { return this.formData.get('email'); }
  get password() { return this.formData.get('password'); }
  get peso() { return this.formData.get('peso'); }
  get est() { return this.formData.get('est'); }
  get sexo() {return this.formData.get('sexo');}
  get tipo() {return this.formData.get('tipo');}

}

interface User{
  nombres: String;
  apellidos: String;
  username: String;
  pass: String;
  edad: String;
  sexo: String;
  peso: String;
  estatura: String;
  tipo: number;
  
}