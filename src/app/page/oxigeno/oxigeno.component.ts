import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation';
import { Label,BaseChartDirective  } from 'ng2-charts'
import {UsuarioService} from '../../service/usuario.service'
import {SocketService} from '../../service/socket.service'
@Component({
  selector: 'app-oxigeno',
  templateUrl: './oxigeno.component.html',
  styleUrls: ['./oxigeno.component.scss']
})
export class OxigenoComponent implements OnInit {
  @ViewChild(BaseChartDirective)
  chartt!: BaseChartDirective;
  promedio:any
  idUser:string = ""
  ioConnection: any
  oxigGrafica: number[] = [];
  oxigTiempoReal: any[] = []

  
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
    { data : this.oxigGrafica, label: 'Oxigeno en la sangre' },

  ];
  constructor(    private usuarioService: UsuarioService,
    private socketService:SocketService) { }


  
  ngOnInit(): void {
    this.defineUser()
    this.getOxigeno()
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
    this.ioConnection = this.socketService.onMessageOxigeno()
    .subscribe((data: any) => {
      console.log("----------SOCKET------------")
      console.log(data)

      if(data.idUsuario == Number(localStorage.getItem(this.idUser))){

        this.oxigTiempoReal = data.oxigenos
        let t = data.oxigenos
        for (let i = 0; i < 10 && i < t.length ; i++) {
  
          this.oxigGrafica[i] = t[i].oxigeno

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
    for(let i = 0; i < this.oxigGrafica.length; i++){
      sum = sum+this.oxigGrafica[i]
    }

    this.promedio = sum / this.oxigGrafica.length
    console.log(this.promedio)
  }

  getOxigeno(){
    this.usuarioService.getOxigeno(Number(localStorage.getItem(this.idUser)))
    .subscribe((res) => {
      console.log(res)
      
      let count = 0
      
      for (let i = res.length-1; i >= res.length-10 && i >= 0; i--) {
        this.oxigGrafica[count] = res[i].oxigeno
        this.oxigTiempoReal[count] = res[i]
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
