import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Card {
  id: number;
  titulo_card: string;
  descricao_card?: string;
  usuario_id: number;
  data_criacao?: string;
  categoria_id?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private baseUrl = 'https://ionic-service.onrender.com/api/cards';

  constructor(private http: HttpClient) {}

  listarCards(usuarioId: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.baseUrl}?usuario_id=${usuarioId}`);
  }

  criarCard(card: Partial<Card>): Observable<Card> {
    return this.http.post<Card>(`${this.baseUrl}`, card);
  }

  atualizarCard(id: number, card: Partial<Card>): Observable<Card> {
    return this.http.put<Card>(`${this.baseUrl}${id}`, card);
  }

  deletarCard(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  relacionarComCategoria(cardId: number, categoriaId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}${cardId}/categorias/${categoriaId}`, {});
  }

  removerRelacionamento(cardId: number, categoriaId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${cardId}/categorias/${categoriaId}`);
  }
}
