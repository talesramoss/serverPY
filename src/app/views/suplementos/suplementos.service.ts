import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  updateSuplemento(suplemento: any): Observable<any> {

    const url = `${this.url_API}/editar`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, suplemento, { headers });
  }
}
