import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { DarkMode } from '../../services/dark-mode';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {


  constructor(
    private serv: Auth,
    private route: Router,
    private dark: DarkMode
  ) { }

  icone = 'fas fa-moon';

  ngOnInit(): void {
    this.estadoInicial(); 
  }


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

    const tema = localStorage.getItem('tema');

    this.icone = tema === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

  }


  estadoInicial() {
    const tema = localStorage.getItem('tema');

    this.icone =
      tema === 'dark'
        ? 'fas fa-sun'
        : 'fas fa-moon';
  }


}
