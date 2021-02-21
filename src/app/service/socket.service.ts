import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';

const SERVER_URL = 'https://practica1-arqui2.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket:any;

  constructor() { this.socket = socketIo(SERVER_URL);}

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public onEvent(event: any): Observable<any> {
      return new Observable<any>(observer => {
          this.socket.on(event, () => observer.next());
      });
  }

  public sendTemperatura(message: any): void {
    this.socket.emit('refreshTemperatura', message);
  }

  public onMessageTemperatura(): Observable<any> {
    return new Observable<any>(observer => {
        this.socket.on('refreshTemperatura', (data: any) => observer.next(data));
    });
  }

  public sendOxigeno(message: any): void {
    this.socket.emit('refreshOxigeno', message);
  }

  public onMessageOxigeno(): Observable<any> {
    return new Observable<any>(observer => {
        this.socket.on('refreshOxigeno', (data: any) => observer.next(data));
    });
  }

  public sendFrecuencia(message: any): void {
    this.socket.emit('refreshFrecuencia', message);
  }

  public onMessageFrecuencia(): Observable<any> {
    return new Observable<any>(observer => {
        this.socket.on('refreshFrecuencia', (data: any) => observer.next(data));
    });
  }
}