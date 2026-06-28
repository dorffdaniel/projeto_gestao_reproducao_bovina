import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { DetalheFazendaService } from '../../../services/detalhe-fazenda-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-fazenda-detalhe',
  imports: [FormsModule],
  templateUrl: './fazenda-detalhe.html',
  styleUrl: './fazenda-detalhe.scss',
})
export class FazendaDetalhe implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private serv: DetalheFazendaService,
    private naveg: Router
  ) { }

  fazenda = signal({
    nome: '',
    proprietario: '',
    telefone: '',
    cidade: '',
    estado: ''
  })

  ativado: boolean = true;
  isOpen: boolean = true;

  ngOnInit(): void {
    this.getIdDetalheFazenda();
  }

  getIdDetalheFazenda() {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.mostrarFazenda(id);
  }

  async mostrarFazenda(id: number) {

    const data = await this.serv.getDetalheDazenda(id);

    if (!data) {
      this.naveg.navigate(['/fazendas']);
      return;
    }

    this.fazenda.set(data);
  }

  editarDadosFazenda() {
    this.ativado = !this.ativado;
    this.isOpen = !this.isOpen;
  }

  cancelarEditFazenda() {
    this.ativado = !this.ativado;
    this.isOpen = !this.isOpen;
  }



}
