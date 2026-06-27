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

  email: string = '';
  password: string = '';

  async login() {

    if (!this.email || !this.password) {
      this.msgErro.set('Campos vazios'); 
      return; 
    }

    const { data, error } = await this.serv.entrar(this.email, this.password)

    if (error) {
      if (error.status == 400) {
        this.msgErro.set('Credenciais invalidas'); 
      }
      return;
    }

    this.route.navigate(['/dashboard']);
    console.log('usuario logado ', data);
  }


}
