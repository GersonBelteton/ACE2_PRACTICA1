import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { path } from '../config.module';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private basePath:string = path.path;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  constructor(private http: HttpClient) { }

  //HANDLE ERROR
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Un error ha ocurrido:', error.error.message);
    } else {
      console.error(
      `Backend returned code ${error.status}, ` +
      `body was: `, error.error);
    }
    return throwError(
      error);
  };

  //GET ALL
  getAll() : Observable<any> {
    let url = `${this.basePath}usuario/get_all`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET SINGLE
  getSingle(id:number) : Observable<any> {
    let url = `${this.basePath}usuario/get/${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //CREATE
  public create(data:any) : Observable<any> {
    let url = `${this.basePath}usuario/crear`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //UPDATE
  public update(data:any) : Observable<any> {
    let url = `${this.basePath}usuario/update_${data.id}`;
    return this.http.put(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //DELETE
  delete(id:number) : Observable<any> {
    let url = `${this.basePath}usuario/delete_${id}`;
    return this.http.delete(url,this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }


  public auth(data:any) : Observable<any> {
    let url = `${this.basePath}auth`;
    return this.http.post(url,data,  this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  

  public getTemperatura(id:number) : Observable<any> {
    let url = `${this.basePath}temperatura/usuario/${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }


  public getFrecuencia(id:number) : Observable<any> {
    let url = `${this.basePath}frecuencia/usuario/${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getOxigeno(id:number) : Observable<any> {
    let url = `${this.basePath}oxigeno/usuario/${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }
}
