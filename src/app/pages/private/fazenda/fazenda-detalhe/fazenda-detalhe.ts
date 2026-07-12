import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { DetalheFazendaService } from '../../../../services/detalhe-fazenda-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-fazenda-detalhe',
  standalone: true,
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

  lote = signal({
    nome: '',
    categoria: '',
    quantidade: '',
    observacao: '',
  });

  mensagem = signal({
    texto: '', 
    tipo: ''
  }); 


  ativado: boolean = true;
  isOpen: boolean = true;
  idFazenda!: number;
  mostrarModal = false;
  mostrarFormLote = signal(false);
  esconderBtn = signal(false);
  existeLotes = signal(false);
  LotesArr = signal<any>([]);


  ngOnInit(): void {
    this.getIdDetalheFazenda();
    this.mostrarFazenda();
    this.mostrarLotes();
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
    this.isOpen = !this.isOpen;
    this.mensagem.set({
      texto: 'Salvo com sucesso.', 
      tipo: 'sucesso'
    })

    setTimeout(() => {
      this.mensagem.set({
        texto: '', 
        tipo: ''
      })
    }, 1500);

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

  abrirFormCadastrarLote() {
    this.mostrarFormLote.set(true);
    this.esconderBtn.set(true);
  }

  fecharFormCadastrarLote() {
    this.mostrarFormLote.set(false);
    this.esconderBtn.set(false);
  }


  async mostrarLotes() {

    const data = await this.serv.getLotes(this.idFazenda);

    if (data?.length != 0) {
      this.existeLotes.set(true);
    }
    console.log("lotes ", data);
    this.LotesArr.set(data);

  }

  async cadastrarNovoLote() {

    if (!this.verificarCamposLotes()) {
      console.log("err888");
      return;
    }

    const payload = {
      fazenda_id: this.idFazenda,
      ... this.lote()
    }

    const data = await this.serv.cadastrarLote(payload);

    console.log(data);
    this.mostrarLotes();
    this.mostrarFormLote.set(false);
    this.esconderBtn.set(false);

  }

  verificarCamposLotes() {

    if (!this.lote().nome || !this.lote().categoria || !this.lote().quantidade) {
      return false;
    }

    return true;

  }

  gerenciarLote(loteId: number) {


  }



}
