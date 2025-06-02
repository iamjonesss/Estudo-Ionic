import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule, RouterModule],
})
export class LoginPage {
  nome_usuario: string = '';
  senha: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async login() {
    try {
      const response: any = await this.usuarioService
        .login(this.nome_usuario, this.senha)
        .toPromise();

      // salva id do usuário (ou token futuramente)
      localStorage.setItem('usuario', JSON.stringify(response));

      this.router.navigate(['/home']);
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Usuário ou senha inválidos!',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}

