import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../service/usuario.service'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  data:any
  atleta:any
  coach:boolean = false
  atletaStr:String = ""
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getSingle()
  }


  getSingle() {
    
    this.usuarioService.getSingle(Number(localStorage.getItem('currentId')))
    .subscribe((res) => {
      console.log(res)

      this.data = res
      if(this.data.tipo_usuario == "Coach"){

        this.coach = true
        if(Number(localStorage.getItem('idAtletaCoach'))!=0){
          this.usuarioService.getSingle(Number(localStorage.getItem('idAtletaCoach')))
          .subscribe((res) => {this.atleta = res;
          this.atletaStr = " de "+this.atleta.nombres},(error)=>{});console.log("Ha ocurrido un error.")
        }
      }else if(this.data.tipo_usuario == "Atleta"){
        this.coach = false
      }

    }, (error) => {
      console.log("Ha ocurrido un error.")
    });
  }


}
