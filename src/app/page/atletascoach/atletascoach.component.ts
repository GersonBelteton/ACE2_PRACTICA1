import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../service/usuario.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CoachService}from '../../service/coach.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-atletascoach',
  templateUrl: './atletascoach.component.html',
  styleUrls: ['./atletascoach.component.scss']
})
export class AtletascoachComponent implements OnInit {
  atcoach:any[] = []
  idAt:any
  formData:FormGroup = new FormGroup({
    'idAtleta': new FormControl('', [Validators.required]),

  });


  constructor(private usuarioService:UsuarioService, private coachService: CoachService, private router:Router)  { }
  users:any[]=[]
  ngOnInit(): void {
    this.getUsers()
    this.getAtletasCoach()
  }

  getAtletasCoach(){
    this.coachService.getAllAtletas(Number(localStorage.getItem('currentId')))
    .subscribe((res) => {
      console.log(res)

      this.atcoach = res

    }, (error) => {
      console.log("Ha ocurrido un error.")
    });
  }
  getUsers(){
    this.usuarioService.getAll()
    .subscribe((res) => {
      console.log(res)

      this.users = res

    }, (error) => {
      console.log("Ha ocurrido un error.")
    });
  }

  redirectDashboard(id:any){

    console.log(id)
    localStorage.setItem("idAtletaCoach", String(id))
    //location.href="/dashboard"
  
  }
  asignarAtleta(){
    console.log(this.idAt)
    let acParams:Atletacoach={
      atleta:Number(this.idAt),
      coach:Number(localStorage.getItem('currentId'))
    }
    if (acParams.atleta != acParams.coach){
     this.coachService.asignarAtleta(acParams)
      .subscribe(res => {
        console.log(res)
  
       // localStorage.setItem("currentId", res.id);
        //localStorage.setItem("currentNombre", res.nombres + " " + res.apellidos);
        //location.href = '/atletascoach'
        this.ngOnInit ()
        //this.router.navigate(['atletascoach']);
      }, error => {
        console.log('hay un error :(')
        console.log(error)
      })
 
    }

  }
  get idAtleta() { return this.formData.get('idAtleta'); }
}

interface Atletacoach{
  atleta: number;
  coach: number;
}

