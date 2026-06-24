import { Component } from '@angular/core';
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

  email: string = '';
  password: string = '';

  async login() {

    const { data, error } = await this.serv.entrar(this.email, this.password)

    if (error) {
      console.log(error);
      return;
    }

    this.route.navigate(['/dashboard']); 
    console.log('usuario logado ', data);
  }


}
