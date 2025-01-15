import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class SuplementosService {

  private readonly url_API = 'http://127.0.0.1:8000/suplementos'

  constructor(
    private http: HttpClient
  ) { }

  listSuplementos(): Observable<any>{
    return this.http.get(`${this.url_API}`)
  }

  criarSuplementos(suplemento: any): Observable<any> {
    const params = new HttpParams()
      .set('nomeSuplemento', suplemento.nomeSuplemento)
      .set('marca', suplemento.marca)
      .set('valor', suplemento.valor)

      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })

      return this.http.post(`${this.url_API}/criar`, params.toString(), { headers })
  }

  getForIDSuplementos(suplemento_id: Number): Observable<any>   {
    const url = `${this.url_API}/${suplemento_id}`
    console.log(url)
    return this.http.get(url)
  }
}
