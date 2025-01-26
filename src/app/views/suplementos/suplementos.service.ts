import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

export interface Suplemento {
  id?: number;
  nomeSuplemento: string;
  marca: string;
  valor: number;
}

@Injectable({
  providedIn: 'root'
})
export class SuplementosService {
  private readonly url_API = 'http://127.0.0.1:8000/suplementos';

  constructor(private http: HttpClient) { }

  listSuplementos(): Observable<Suplemento[]> {
    return this.http.get<Suplemento[]>(this.url_API).pipe(
      catchError(this.handleError)
    );
  }

  criarSuplementos(suplemento: Suplemento): Observable<Suplemento> {
    const params = new HttpParams()
      .set('nomeSuplemento', suplemento.nomeSuplemento)
      .set('marca', suplemento.marca)
      .set('valor', suplemento.valor.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<Suplemento>(`${this.url_API}/criar`, params.toString(), { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getForIDSuplementos(suplemento_id: number): Observable<Suplemento> {
    const url = `${this.url_API}/${suplemento_id}`;
    return this.http.get<Suplemento>(url).pipe(
      catchError(this.handleError)
    );
  }

  updateSuplemento(suplementoId: number, payload: Suplemento): Observable<Suplemento> {
    const url = `${this.url_API}/editar/${suplementoId}`;
    return this.http.put<Suplemento>(url, payload).pipe(
      catchError(this.handleError)
    );
  }

  deleteSuplemento(suplemento_id: number): Observable<any> {
    const url = `${this.url_API}/${suplemento_id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
