import { Component, OnInit } from '@angular/core';
import { CardService, Card } from 'src/app/services/card.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalController } from '@ionic/angular';
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

  constructor(private cardService: CardService, private router: Router, private modalCtrl: ModalController) {}

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
  abrirModalCriarCard() {
    console.log("Abrir modal para criar novo card");
  }
  async abrirModal() {
  const modal = await this.modalCtrl.create({
    component: CardModalComponent
  });
  await modal.present();
  const { data } = await modal.onWillDismiss();
  if (data) {
    this.cardService.criarCard(data).subscribe({
      next: (novoCard) => {
        this.cards.push(novoCard);
      },
      error: (erro) => console.error('Erro ao criar card:', erro)
    });
  }
}}



// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { IonicModule } from '@ionic/angular';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule, IonicModule, FormsModule, RouterModule],
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage {
//   newTask: string = '';
//   tasks: string[] = [];

//   constructor(private router: Router) {}

//   addTask() {
//     if (this.newTask.trim() !== '') {
//       this.tasks.push(this.newTask.trim());
//       this.newTask = '';
//     }
//   }

//   removeTask(index: number) {
//     this.tasks.splice(index, 1);
//   }
//     logout() {
//     localStorage.removeItem('usuario');
//     this.router.navigate(['/login']);
//     }
// }
