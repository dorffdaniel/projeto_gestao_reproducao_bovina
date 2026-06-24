import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {


  constructor(private serv: Auth, private route: Router) { }

  async logout() {
    const { error } = await this.serv.sair();

    if (error) {
      console.log(error)
      return;
    }

    this.route.navigate(['/login'])

  }



}
