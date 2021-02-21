import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { path } from '../config.module';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
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
  getAllAtletas(id:number) : Observable<any> {
    let url = `${this.basePath}coach/${id}`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public asignarAtleta(data:any) : Observable<any> {
    let url = `${this.basePath}coach/crear`;
    return this.http.post(url,data,  this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }
  
}
