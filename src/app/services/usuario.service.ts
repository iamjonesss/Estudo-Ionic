// usuario.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(nome_usuario: string, senha: string) {
    return this.http.post(`${this.apiUrl}/usuarios/login`, {
      nome_usuario,
      senha
    });
  }
}
