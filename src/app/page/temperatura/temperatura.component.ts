import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation';
import { Label,BaseChartDirective  } from 'ng2-charts'
import {UsuarioService} from '../../service/usuario.service'
import {SocketService} from '../../service/socket.service'
@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.scss']
})
export class TemperaturaComponent implements OnInit {

  @ViewChild(BaseChartDirective)
  chartt!: BaseChartDirective;
  minima:any
  maxima:any
  promedio:any
  idUser:string = ""
  ioConnection: any

  tempGrafica : number[] = [];// arreglo donde se guardan los datos numericos de las temperaturas para mostrar la grafica
  tempTiempoReal: any[] = []//obitene las ultimas 10 temperaturas en tiempo real
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
    { data : this.tempGrafica, label: 'Temperatura' },

  ];
  constructor(    private usuarioService: UsuarioService,
    private socketService:SocketService) { }


  
  ngOnInit(): void {
    //this.chart.chart.update()
    this.defineUser()
    this.getTemperaturas()
    this.initToConnection()

    //this.chartt.chart.
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
    this.ioConnection = this.socketService.onMessageTemperatura()
    .subscribe((data: any) => {
      console.log("----------SOCKET------------")
      console.log(data)

      if(data.idUsuario == Number(localStorage.getItem(this.idUser))){

    
        this.tempTiempoReal = data.temperaturas
        let t = data.temperaturas
        for (let i = 0; i < 10 && i < t.length  ; i++) {
          
          this.tempGrafica[i] = t[i].temperatura
    
        }
        this.chartt.chart.update()
        this.getPromedio()
        this.getMaxima()
        this.getMinima()
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
    for(let i = 0; i < this.tempGrafica.length; i++){
      sum = sum+this.tempGrafica[i]
    }

    this.promedio = sum / this.tempGrafica.length
    console.log(this.promedio)
  }

  getMaxima(){
    this.maxima = this.tempGrafica[0]
    for(let i = 0; i < this.tempGrafica.length; i++){
      if(this.tempGrafica[i] > this.maxima){
        this.maxima = this.tempGrafica[i]
      }
    }

    console.log(this.maxima)
  }

  getMinima(){
    this.minima = this.tempGrafica[0]
    for(let i = 0; i < this.tempGrafica.length; i++){
      if(this.tempGrafica[i] < this.minima){
        this.minima = this.tempGrafica[i]
      }
    }

    console.log(this.minima)
  }
  getTemperaturas(){//obtiene las últimas 10 temperaturas al recargar la página
    this.usuarioService.getTemperatura(Number(localStorage.getItem(this.idUser)))
    .subscribe((res) => {
      console.log(res)
      
      let count = 0
      //this.temp = res
      for (let i = res.length-1; i >= res.length-10 && i >= 0; i--) {
        this.tempGrafica[count] = res[i].temperatura
        this.tempTiempoReal[count] = res[i]
        count++
      }

      this.getPromedio()
      this.getMaxima()
      this.getMinima()
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


