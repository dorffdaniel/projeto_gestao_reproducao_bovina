import { Component, OnInit, signal } from '@angular/core';
import { PerfilService } from '../../../services/perfil-service';
import { Router } from '@angular/router';
import { DashboardService } from '../../../services/dashboard-service'


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  constructor(
    private serv: PerfilService,
    private route: Router, 
    private dashServ: DashboardService
  ) { }

  nome = signal<null | string>(null);
  msgSaudacao = signal<null | string>(null);
  dataHj = signal<null | string>(null);
  totalFazendas = signal<null | number | undefined>(null); 

  ngOnInit(): void {
    this.getDadosUser();
    this.saudacao();
    this.mostrarTotalFazendas(); 
  }

  async getDadosUser() {
    const dados = await this.serv.getPerfil();

    const primeiro_nome = dados.nome.trim().split(' ')[0];
    this.nome.set(primeiro_nome);

  }

  saudacao() {
    const data = new Date();

    const dataAtual = data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    this.dataHj.set(dataAtual);

    const horas = data.getHours();
    let msg = 'Ola';

    if (horas >= 5 && horas < 12) {
      msg = 'Bom dia';
    } else if (horas >= 12 && horas <= 18) {
      msg = 'Boa tarde'
    } else {
      msg = 'Boa noite'
    }

    this.msgSaudacao.set(msg);
  }

  async mostrarTotalFazendas() {

    const data = await this.dashServ.getTotalFazendas(); 
    this.totalFazendas.set(data?.length); 
  }


}
