import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  nomeUsuario: string = '';
  senha: string = '';
  backendUrl = 'https://ionic-service.onrender.com/api/usuarios/';

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  async cadastrar() {
    if (!this.nomeUsuario || !this.senha) {
      const alert = await this.alertCtrl.create({
        header: 'Erro',
        message: 'Preencha todos os campos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    this.http.post(this.backendUrl, {
      nome_usuario: this.nomeUsuario,
      senha: this.senha,
    }).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Cadastro realizado com sucesso!',
          duration: 2000,
          color: 'success',
        });
        toast.present();
        this.nomeUsuario = '';
        this.senha = '';
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
