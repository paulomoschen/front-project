import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  constructor(
    private httpClient: HttpClient,
  ) { }

  public endereco: string = 'http://localhost:8080/api';

  public buscar(enderecoConsumo: string): Promise<any> {
    return new Promise((sucesso, error) => {
      this.request(this.httpClient.get(`${this.endereco}${enderecoConsumo}`, { headers: this.headers }), sucesso, error);
    });
  }

  public salvar(enderecoConsumo: string, item: any): Promise<any> {
    return new Promise((sucesso, error) => {
      this.request(this.httpClient.post(`${this.endereco}${enderecoConsumo}`, item, { headers: this.headers }), sucesso, error);
    });
  }

  public editar(enderecoConsumo: string, item: any): Promise<any> {
    return new Promise((sucesso, error) => {
      this.request(this.httpClient.put(`${this.endereco}${enderecoConsumo}`, item, { headers: this.headers }), sucesso, error);
    });
  }

  public deletar(enderecoConsumo: string): Promise<any> {
    return new Promise((sucesso, error) => {
      this.request(this.httpClient.delete(`${this.endereco}${enderecoConsumo}`, { headers: this.headers }), sucesso, error);
    });
  }

  private request(request: Observable<any>, sucesso: any, error: any) {
    request.pipe(catchError((err) => {
      error(err);
      throw err;
    })).subscribe((response) => {
      sucesso(response);
    });
  }
}
