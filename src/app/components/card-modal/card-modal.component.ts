import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class CardModalComponent {
  titulo_card: string = '';
  descricao_card: string = '';
  categoria_id: number | null = null;

  constructor(private modalCtrl: ModalController) {}

  salvar() {
    const novoCard = {
      titulo_card: this.titulo_card,
      descricao_card: this.descricao_card,
      categoria_id: this.categoria_id
    };
    this.modalCtrl.dismiss(novoCard);
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}
