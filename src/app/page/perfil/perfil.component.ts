import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../service/usuario.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  data:any
  formData:any

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,) { }
  ngOnInit(): void {
    this.getSingle()
  }



  getSingle() {
    
    this.usuarioService.getSingle(Number(localStorage.getItem('currentId')))
    .subscribe((res) => {
      console.log(res)

      this.data = res

    }, (error) => {
      console.log("Ha ocurrido un error.")
    });
  }


}
