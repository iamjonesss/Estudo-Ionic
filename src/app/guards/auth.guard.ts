import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const usuario = localStorage.getItem('usuario');
    
    if (usuario) {
      return true; // Permite acesso à rota
    } else {
      this.router.navigate(['/login']);
      return false; // Bloqueia e redireciona
    }
  }
}
