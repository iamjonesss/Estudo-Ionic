import { Component, OnInit } from '@angular/core';
import { CardService, Card } from 'src/app/services/card.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModalComponent } from '../components/card-modal/card-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
})
export class HomePage implements OnInit {
  cards: Card[] = [];

  constructor(
    private cardService: CardService,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.buscarCards();
  }

  buscarCards(): void {
    this.cardService.listarCards().subscribe({
      next: (cards) => (this.cards = cards),
      error: (erro) => console.error('Erro ao buscar cards:', erro)
    });
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  async abrirModal(card?: Card) {
    const modal = await this.modalCtrl.create({
      component: CardModalComponent,
      componentProps: { card: card || null }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      if (data.id) {
        // Editar
        this.cardService.atualizarCard(data.id, data).subscribe({
          next: () => this.buscarCards(),
          error: (err) => console.error('Erro ao editar card:', err)
        });
      } else {
        // Criar
        this.cardService.criarCard(data).subscribe({
          next: (novoCard) => {
            this.cards.push(novoCard);
          },
          error: (erro) => console.error('Erro ao criar card:', erro)
        });
      }
    }
  }
}
