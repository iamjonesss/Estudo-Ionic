import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CardModalComponent } from 'src/app/components/card-modal/card-modal.component';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/services/card.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cards: Card[] = [];

  constructor(
    private modalCtrl: ModalController,
    private cardService: CardService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  async abrirModalCard() {
    const modal = await this.modalCtrl.create({
      component: CardModalComponent,
    });

    modal.onDidDismiss().then((result) => {
      const novoCard = result.data;
      if (novoCard) {
        this.cardService.criarCard({
          ...novoCard,
          usuario_id: JSON.parse(localStorage.getItem('usuario') || '{}').usuario_id
        }).subscribe({
          next: (card) => {
            this.cards.push(card); // atualiza lista
          },
          error: (err) => console.error('Erro ao criar card:', err)
        });
      }
    });

    await modal.present();
  }

  ionViewWillEnter() {
    this.carregarCards();
  }

  carregarCards() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const usuarioId = usuario?.usuario_id;

    this.cardService.listarCards(usuarioId).subscribe({
      next: (res) => {
        this.cards = res;
      },
      error: (err) => console.error('Erro ao carregar cards:', err)
    });
  }
  deletarCard(id: number) {
    this.cardService.deletarCard(id).subscribe({
      next: () => {
        this.cards = this.cards.filter(card => card.id !== id);
      },
      error: (err) => {
        console.error('Erro ao deletar card:', err);
      }
    });
  }
  async confirmarExclusao(id: number) {
  const alert = await this.alertCtrl.create({
    header: 'Confirmar Exclusão',
    message: 'Você tem certeza que quer excluir este card?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Excluir',
        handler: () => this.deletarCard(id)
      }
    ]
  });

  await alert.present();
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
    }
}
