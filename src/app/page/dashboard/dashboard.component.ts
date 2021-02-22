import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation';
import { Label,BaseChartDirective } from 'ng2-charts'
import {UsuarioService} from '../../service/usuario.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  @ViewChild(BaseChartDirective)
  chartt!: BaseChartDirective;

  idUser:string = ""
  temp: number[] = [];
  frec: number[] = [];
  oxig: number[] = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic themin.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7','8','9','10'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data : this.temp, label: 'Temperatura' },
    { data: this.frec, label: 'Pulso cardiaco' },
    { data: this.oxig, label: 'Oxigeno en la sangre' }
  ];
  constructor(
    private router: Router,
    private usuarioService: UsuarioService

  ) { }

  ngOnInit(): void {
    this.defineUser()
    this.getTemperaturas()
    this.getFrecuencias()
    this.getOxigeno()

    //this.chartt.update()
    //this.chartt.chart.update()
    

  }

  defineUser(){ //Este método define si mostrar el dashboard del usuario logeado o del atleta asignado al coach
    if(localStorage.getItem('currentType') == "Atleta" ||
    (localStorage.getItem('currentType') == "Coach" && Number(localStorage.getItem('idAtletaCoach'))== 0 )){
      this.idUser = 'currentId'
    }else{
      this.idUser = 'idAtletaCoach'
    }

  }
  getTemperaturas(){

      this.usuarioService.getTemperatura(Number(localStorage.getItem(this.idUser)))
      .subscribe((res) => {
        console.log(res)
        
        let count = 0
        
        for (let i = res.length-1; i > res.length-10 && i >= 0; i--) {
  
          this.temp[count] = res[i].temperatura
          count++
        }
        
  
      }, (error) => {
        console.log("Ha ocurrido un error.")
      });


  }


  getFrecuencias(){    

      this.usuarioService.getFrecuencia(Number(localStorage.getItem(this.idUser)))
      .subscribe((res) => {
        console.log(res)
        
        let count = 0
        
        for (let i = res.length-1; i > res.length-10 && i >= 0; i--) {

          this.frec[count] = res[i].frecuencia
          count++
        }
        

      }, (error) => {
        console.log("Ha ocurrido un error.")
      });

  }

  getOxigeno(){

      this.usuarioService.getOxigeno(Number(localStorage.getItem(this.idUser)))
      .subscribe((res) => {
        console.log(res)
        
        let count = 0
        
        for (let i = res.length-1; i > res.length-10 && i >= 0; i--) {
  
          this.oxig[count] = res[i].oxigeno
          count++
        }
        
  
      }, (error) => {
        console.log("Ha ocurrido un error.")
      });


  }


  public salirDashboard(){
    localStorage.setItem("idAtletaCoach", "0")
    //location.href="/dashboard"
    this.router.navigate(['/dashboard'])
  }


  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
