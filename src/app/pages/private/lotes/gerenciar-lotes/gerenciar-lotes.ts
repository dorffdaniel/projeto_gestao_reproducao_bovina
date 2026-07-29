import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GerenciarLoteService } from '../../../../services/gerenciar-lote-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-gerenciar-lotes',
  imports: [FormsModule],
  templateUrl: './gerenciar-lotes.html',
  styleUrl: './gerenciar-lotes.scss',
})
export class GerenciarLotes implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private naveg: Router,
    private serv: GerenciarLoteService,
    private router: Router
  ) { }

  idLote!: number;
  esconderBtn = signal(false);
  mostrarFormProtocolo = signal(false);
  protocolo = signal(this.criarProtocoloVazio());
  protocolosRegistrados = signal<any>([]);
  isLoading = signal(false);
  desabilitarCampos = signal(true);
  desabilitarBtn = signal(false);
  mostrarCardEdit = signal(true);

  dadosLote = signal({
    id: 0,
    nome: '',
    categoria: '',
    total_animais: 0,
    observacoes: '',
    fazenda_id: 0
  });


  ngOnInit(): void {
    this.getIdlote();
    this.mostrarDadosLote();
  }

  private criarProtocoloVazio() {
    return {
      data_inicio: '',
      hora_inicio: '',
      total_animais: '',
      status: '',
      observacoes: ''
    };
  }

  mensagem = signal({
    texto: '',
    tipo: ''
  });

  voltarPaginaAnterior() {
    const pag = sessionStorage.getItem("gerenciar_detalhe_fazenda");

    if (pag) {
      this.router.navigateByUrl(pag);
    }

  }

  getIdlote() {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    if (!id) {
      this.naveg.navigate(['/fazendas'])
    }
    this.idLote = id;
  }


  async mostrarDadosLote() {

    this.isLoading.set(true);

    try {
      const data = await this.serv.getDadosLote(this.idLote);

      this.dadosLote.set(data);

      await this.obterProtocolosRegistrados();

    } catch (error: any) {
      console.log(error);

      if (error.code === 'PGRST116') {
        this.naveg.navigate(['/fazendas']);
        return;
      }

    } finally {
      this.isLoading.set(false);
    }

  }

  editarLote() {
    this.desabilitarCampos.set(false);
    this.mostrarCardEdit.set(false);

  }

  cancelarEditLote() {
    this.desabilitarCampos.set(true);
    this.mostrarCardEdit.set(true);
  }


  async salvarAlteracaoLote() {

    const payload = {
      ... this.dadosLote()
    }

    this.desabilitarBtn.set(true);

    try {

      await this.serv.atualizarLote(payload);

      this.mensagem.set({
        texto: 'Editado com sucesso',
        tipo: 'sucesso'
      })

      this.desabilitarCampos.set(true);
      this.mostrarCardEdit.set(true);
      this.desabilitarBtn.set(false);

      setTimeout(() => {
        this.mensagem.set({
          texto: '',
          tipo: ''
        })
      }, 1500);


    } catch (error) {
      console.log(error);
    }

  }


  abrirFormCadastrarProtocolo() {
    this.mostrarFormProtocolo.set(true);
    this.esconderBtn.set(true);
  }


  fecharFormCadastrarProtocolo() {
    this.mostrarFormProtocolo.set(false);
    this.esconderBtn.set(false);
  }


  async cadastrarNovoProtocolo() {

    if (!this.verificartCamposProtocolo()) {
      console.log("erro campos em falta");
      return
    }

    const payload = {
      ... this.protocolo(),
      fazenda_id: this.dadosLote().fazenda_id,
      lote_id: this.dadosLote()!.id,
      status: "Em andamento"
    }

    try {
      const data = await this.serv.registrarProtocolo(payload);

      this.fecharFormCadastrarProtocolo();
      this.limparFormulario();

      this.mensagem.set({
        texto: 'Protocolo registrado com sucesso',
        tipo: 'sucesso'
      })

      this.obterProtocolosRegistrados()

      setTimeout(() => {
        this.mensagem.set({
          texto: '',
          tipo: ''
        })
      }, 1500);


    } catch (error) {
      console.log(error);
    }

  }

  async obterProtocolosRegistrados() {

    try {
      const loteId = this.dadosLote()!.id

      const data = await this.serv.getDadosProtocolos(loteId);
      this.protocolosRegistrados.set(data);
      console.log("prot", data);

    } catch (error) {
      console.log(error);
    }

  }


  verificartCamposProtocolo() {

    if (!this.protocolo().data_inicio || !this.protocolo().hora_inicio || !this.protocolo().total_animais) {
      return false;
    }

    return true;
  }

  limparFormulario() {
    this.protocolo.set(this.criarProtocoloVazio());
  }

  gerenciarProtocolo(protocolo_id: number) {
    const url = this.router.url;
    sessionStorage.setItem("gerenciar_detalhe_lote", url);

    this.router.navigate(['/protocolo', protocolo_id]);
  }

}
