import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { DetalheFazendaService } from '../../../../services/detalhe-fazenda-service';
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
    estado: '',
    tipo_controle: ''
  })

  ativado: boolean = true;
  isOpen: boolean = true;
  idFazenda!: number;
  mostrarModal = false; 

  ngOnInit(): void {
    this.getIdDetalheFazenda();
    this.mostrarFazenda();
  }

  getIdDetalheFazenda() {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.idFazenda = id
  }

  async mostrarFazenda() {

    const data = await this.serv.getDetalheDazenda(this.idFazenda);

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

    this.getIdDetalheFazenda();
  }


  async salvarEditDadosFazenda() {

    const data = await this.serv.salvarEdicaoFazenda(this.idFazenda, this.fazenda());

    this.fazenda.set(data);
    this.ativado = true;
  }


  voltar() {
    this.naveg.navigate(['/fazendas']);
  }

  abrirModal() {
    this.mostrarModal = true; 
  }

  fecharModal() {
    this.mostrarModal = false; 
  }

  apagarFazenda() {
    
  }

}
