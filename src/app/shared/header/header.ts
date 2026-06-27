import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { DarkMode } from '../../services/dark-mode';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {


  constructor(
    private serv: Auth,
    private route: Router,
    private dark: DarkMode
  ) { }

  texto: string = 'Dark mode'

  async logout() {
    const { error } = await this.serv.sair();

    if (error) {
      console.log(error)
      return;
    }

    this.route.navigate(['/login'])

  }

  efeitoDarkMode() {
    this.dark.adicionarToggle();

    if (this.texto == 'Dark mode') {
      this.texto = 'Light mode';
    } else {
      this.texto = 'Dark mode';
    }

  }



}
