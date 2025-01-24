import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly url_USER = 'http://127.0.0.1:8000/usuario'
  private readonly url_LOGIN = 'http://127.0.0.1:8000/login'

  constructor(
    private http: HttpClient
  ) { }

  getForIDSusuario(id: number): Observable<any> {
    return this.http.get(`${this.url_USER}/id`)
  }

  criarUsuario(user: any): Observable<any>{
    const params = new HttpParams()
      .set('nome', user.nome)
      .set('email', user.email)
      .set('telefone', user.telefone)
      .set('senha', user.senha)

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    })

    return this.http.post(`${this.url_USER}/criar`, params.toString(), { headers })
  }

  loginUsuario(email: string, senha: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('senha', senha);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.url_LOGIN, params.toString(), { headers });
  }


}
