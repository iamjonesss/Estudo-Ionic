import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  email: string = '';
  backendUrl = 'http://localhost:8000/usuarios/';

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  async cadastrar() {
    if (!this.email || !this.email.includes('@')) {
      const alert = await this.alertCtrl.create({
        header: 'Erro',
        message: 'Digite um e-mail válido.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    this.http.post(this.backendUrl, { email: this.email }).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Cadastro realizado com sucesso!',
          duration: 2000,
          color: 'success',
        });
        toast.present();
        this.email = '';
      },
      error: async (err) => {
        const alert = await this.alertCtrl.create({
          header: 'Erro ao cadastrar',
          message: err?.error?.detail || 'Não foi possível cadastrar. Tente novamente.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }
}
