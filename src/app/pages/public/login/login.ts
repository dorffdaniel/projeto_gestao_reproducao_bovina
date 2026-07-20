import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  constructor(
    private serv: Auth,
    private route: Router
  ) { }

  msgErro = signal<null | string>(null);
  mostrarSenha = false; 
  focadoNaSenha = false; 
  isLoading = signal(false); 

  Formlogin = {
    email: '', 
    password: ''
  }

  async login() {

    if (!this.Formlogin.email || !this.Formlogin.password) {
      this.msgErro.set('Campos vazios'); 
      return; 
    }

    this.isLoading.set(true); 

    const { data, error } = await this.serv.entrar(this.Formlogin)

    if (error) {
      if (error.status == 400) {
        this.msgErro.set('Credenciais invalidas'); 
      }
      return;
    }

    this.isLoading.set(false); 
    this.route.navigate(['/dashboard']);
    
  }

  ativarCampo() {
    this.mostrarSenha = !this.mostrarSenha; 
  }

  aFocar() {
    this.focadoNaSenha = true; 
  }

  saiuFoco() {
    this.focadoNaSenha = false; 
  }

  mostrarIconeOlho() {
    return this.focadoNaSenha && this.Formlogin.password.length > 0
  }


}
