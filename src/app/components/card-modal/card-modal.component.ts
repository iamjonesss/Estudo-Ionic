import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Card } from 'src/app/services/card.service';
import { CategoriaService, Categoria } from 'src/app/services/categoria.service';


@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
  standalone: true,
 imports: [CommonModule, IonicModule, FormsModule, CardModalComponent],
})
export class CardModalComponent implements OnInit {
  @Input() card: Card | null = null;

  titulo_card: string = '';
  descricao_card: string = '';
  categoria_id: number | null = null;
  categorias: Categoria[] = [];

  constructor(private modalCtrl: ModalController, private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    if (this.card) {
      this.titulo_card = this.card.titulo_card;
      this.descricao_card = this.card.descricao_card || '';
      this.categoria_id = this.card.categoria_id || null;
    }

    this.categoriaService.listarCategorias().subscribe({
      next: (res) => {
        this.categorias = res;
      },
      error: (err) => {
        console.error('Erro ao carregar categorias:', err);
      }
    });
  }

  salvar() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    const novoCard: any = {
      titulo_card: this.titulo_card,
      descricao_card: this.descricao_card,
      categoria_id: this.categoria_id,
      usuario_id: usuario.usuario_id
    };

    if (this.card?.id) {
      novoCard.id = this.card.id;
    }

    this.modalCtrl.dismiss(novoCard);
  }


  cancelar() {
    this.modalCtrl.dismiss();
  }
}
