import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation';
import { Label,BaseChartDirective  } from 'ng2-charts'
import {UsuarioService} from '../../service/usuario.service'
import {SocketService} from '../../service/socket.service'
@Component({
  selector: 'app-frecuencia',
  templateUrl: './frecuencia.component.html',
  styleUrls: ['./frecuencia.component.scss']
})
export class FrecuenciaComponent implements OnInit {


  @ViewChild(BaseChartDirective)
  chartt!: BaseChartDirective;
  promedio:any
  idUser:string = ""
  ioConnection: any
  frec: number[] = [];

  frecGrafica : number[] = []
  frecTiempoReal: any[] = []
  
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
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data : this.frecGrafica, label: 'Ritmo cardiaco' },

  ];
  constructor(    private usuarioService: UsuarioService,
    private socketService:SocketService) { }


  
  ngOnInit(): void {
    this.defineUser()
    this.getFrecuencias()
    this.initToConnection()

  }

  defineUser(){ //Este método define si mostrar el dashboard del usuario logeado o del atleta asignado al coach
    if(localStorage.getItem('currentType') == "Atleta" ||
    (localStorage.getItem('currentType') == "Coach" && Number(localStorage.getItem('idAtletaCoach'))== 0 )){
      this.idUser = 'currentId'
    }else{
      this.idUser = 'idAtletaCoach'
    }

  }


  private initToConnection(): void {
    this.socketService.initSocket()
    this.ioConnection = this.socketService.onMessageFrecuencia()
    .subscribe((data: any) => {
      console.log("----------SOCKET------------")
      console.log(data)

      if(data.idUsuario == Number(localStorage.getItem(this.idUser))){

        this.frecTiempoReal = data.frecuencias
        let t = data.frecuencias
        for (let i = 0; i < 10 && i < t.length ; i++) {
  
          this.frecGrafica[i] = t[i].frecuencia
   
        }
        this.chartt.chart.update()
        this.getPromedio()
        //this.chartt.update(1)
        //this.chartt.chart.update()
        //this.chart.chart.update()
        
      }
    })

    this.socketService.onEvent('connect')
    .subscribe(()=>{
      console.log("Connected")
    })

    this.socketService.onEvent('disconnect')
    .subscribe(()=>{
      console.log("Disconnected")
    })
  }

  getPromedio(){
    
    let sum = 0
    for(let i = 0; i < this.frecGrafica.length; i++){
      sum = sum+this.frecGrafica[i]
    }

    this.promedio = sum / this.frecGrafica.length
    console.log(this.promedio)
  }

  getFrecuencias(){
    this.usuarioService.getFrecuencia(Number(localStorage.getItem(this.idUser)))
    .subscribe((res) => {
      console.log(res)
      
      let count = 0
      
      for (let i = res.length-1; i >= res.length-10 && i >= 0; i--) {
        this.frecGrafica[count] = res[i].frecuencia
        this.frecTiempoReal[count] = res[i]
        count++
      }
      this.getPromedio()

    }, (error) => {
      console.log("Ha ocurrido un error.")
    });
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
