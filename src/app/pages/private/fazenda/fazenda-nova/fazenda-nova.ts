import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { FazendasService } from '../../../../services/fazendas-service';


@Component({
  selector: 'app-fazenda-nova',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './fazenda-nova.html',
  styleUrl: './fazenda-nova.scss',
})
export class FazendaNova {

  constructor(
    private serv: FazendasService, 
    private route: Router 
  ) { }

  fazenda = signal({
    nome: '',
    proprietario: '',
    telefone: '',
    cidade: '',
    estado: ''
  });

  tentouSalvar = signal(false);
  desabilitarBtn = signal(false);


  async criarFazenda(form: NgForm) {

    this.tentouSalvar.set(true);

    if (form.invalid) {
      return;
    }

    this.desabilitarBtn.set(true);

    try {
      const data = await this.serv.cadastrarFazenda(this.fazenda());

      setTimeout(() => {
        
      }, 1500);

    } catch (error) {

    } finally {
      this.desabilitarBtn.set(false);

    }

  }



}
