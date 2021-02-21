import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../service/usuario.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})


export class PageComponent implements OnInit {
  data:any;



  formData:any

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    console.log('hola')
    this.initializeForm()
    this.getSingle()
    
  }

  initializeForm() {
    this.formData = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'apellido': new FormControl('', [Validators.required]),
      'edad': new FormControl(''),
      'peso': new FormControl(''),
      'estatura': new FormControl(''),
      'sexo': new FormControl(''),
      'tipo': new FormControl(''),
      'id': new FormControl(null),
    });
  }

  getSingle() {
    
    this.usuarioService.getSingle(Number(localStorage.getItem('currentId')))
    .subscribe((res) => {
      console.log(res)

      this.data = res
      this.formData.get('nombre').setValue(res.nombres);
      this.formData.get('apellido').setValue(res.apellidos);
      this.formData.get('edad').setValue(res.edad);
      this.formData.get('peso').setValue(res.peso);
      this.formData.get('estatura').setValue(res.estatura);
      this.formData.get('sexo').setValue(res.sexo);
      this.formData.get('tipo').setValue(res.tipo);
      this.formData.get('id').setValue(res.id);

    }, (error) => {
      console.log("Ha ocurrido un error.")
    });
  }



  get nombre() { return this.formData.get('nombre'); }
  get apellido() { return this.formData.get('apellido'); }
  get edad() { return this.formData.get('edad'); }
  get peso() { return this.formData.get('peso'); }
  get estatura() { return this.formData.get('estatura'); }
  get sexo() { return this.formData.get('sexo'); }
  get tipo() { return this.formData.get('tipo'); }
  get id() { return this.formData.get('id'); }
}
