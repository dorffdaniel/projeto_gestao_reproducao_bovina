import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GerenciarProtocoloService } from '../../../../services/gerenciar-protocolo-service';
import { PerfilService } from '../../../../services/perfil-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-gerenciar-protocolos',
  imports: [FormsModule],
  templateUrl: './gerenciar-protocolos.html',
  styleUrl: './gerenciar-protocolos.scss',
})
export class GerenciarProtocolos implements OnInit {

  constructor(
    private rota: ActivatedRoute,
    private route: Router,
    private serv: GerenciarProtocoloService,
    private perfiServ: PerfilService
  ) { }

  idProtocolo!: number;
  dadosProtocolo = signal<any>(null);
  esconderBtn = signal(false);
  barraProgresso = signal(0);
  abrirForm = signal({
    tipo: '',
    aberto: false
  })
  existeEventoRegistrado = signal({
    tipo: '',
    existe: false
  })

  // mensagem quando edito e fica abaixo dos campos
  mensagem = signal({
    texto: '',
    tipo: ''
  });

  evento_protocolo = signal(this.colunasProtocolo());
  evento_d0 = signal(this.colunasEventoD0())
  evento_d7 = signal(this.colunasEventoD7());
  isLoading = signal(false);
  nomeResponsavel = signal<string | null>(null);
  estadoD0 = signal('Disponivel');
  estadoD7 = signal('Bloqueado');
  estadoIA = signal('Bloqueado');
  estadoDG = signal('Bloqueado');
  dadosEventoD0Registrado = signal<any | null>(null);
  dadosEventoD7Registrado = signal<any | null>(null);
  esconderBtnEditar = signal(true);
  esconderMsgEdit = signal(true);
  // mensagem alerta canto superior
  mostrarAlerta = signal({
    texto: '',
    existe: false
  });

  editando = signal({
    D0: false,
    D7: false,
    IA: false,
    DG: false
  });

  private colunasProtocolo() {
    return {
      data: '',
      hora_inicio: '',
      observacoes: '',
    }
  }

  private colunasEventoD0() {
    return {
      peso: '',
      ecc: '',
      ava: '',
      indutor: '',
      medicamento: ''
    }
  }

  private colunasEventoD7() {
    return {
      peso: '',
      ecc: '',
      ava: '',
      resultado_ciclo: '',
      implante_retirado: null as boolean | null,
      medicacao: '',
      implante: '',
      resultado_implante: ''
    }
  }


  ngOnInit(): void {
    this.mostrarDadosperfilResponsavel();
    this.getIdProtocolo();
    this.mostrarDadosProtocolo();
    this.mostrarEventosRegistrados();
    this.mostrarEventoD0();
    this.mostrarEventoD7();
  }

  voltarPaginaAnterior() {
    const pag = sessionStorage.getItem("gerenciar_detalhe_lote");

    if (pag) {
      this.route.navigateByUrl(pag);
    }
  }

  async mostrarDadosperfilResponsavel() {

    try {
      const data = await this.perfiServ.getPerfil();
      const primNome = data.nome.split(' ')[0];
      this.nomeResponsavel.set(primNome);

    } catch (error) {
      console.log(error)
    }

  }

  getIdProtocolo() {
    const id = Number(this.rota.snapshot.paramMap.get('id'));

    if (!id) {
      this.route.navigate(['/fazendas']);
    }

    this.idProtocolo = id;
  }

  async mostrarDadosProtocolo() {

    this.isLoading.set(true);

    try {
      const data = await this.serv.obterDadosProtocolo(this.idProtocolo);

      this.dadosProtocolo.set(data);
      console.log("Dados protocolo aqui: ", data)

    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading.set(false);
    }

  }


  abrirFormCadastrarEventoProtocolo(tipo: 'D0' | 'D7' | 'D9' | 'IA' | 'DG') {

    this.abrirForm.set({
      tipo: tipo,
      aberto: true
    })

    this.esconderBtn.set(true);
  }

  fecharFormCadastrarEventoProtocolo(tipo: 'D0' | 'D7' | 'D9' | 'IA' | 'DG') {
    this.abrirForm.set({
      tipo: tipo,
      aberto: false
    })
    this.esconderBtn.set(false);
  }


  async cadastrarEventoD0() {

    const payload = {
      ... this.evento_protocolo(),
      protocolo_id: this.idProtocolo,
      status: 'Em andamento',
      tipo_evento: 'D0'
    }

    try {
      const evento = await this.serv.registrarEvento(payload);

      if (!evento) {
        return;
      }

      const payloadD0 = {
        ...this.evento_d0(),
        evento_protocolo_id: evento.id
      }

      await this.serv.registrarDadosD0(payloadD0);
      this.fecharFormCadastrarEventoProtocolo('D0')
      this.limparCampos('D0')
      this.mostrarEventosRegistrados();
      this.mostrarEventoD0();

      this.mostrarAlerta.set({
        texto: 'D0 cadastrado com sucesso',
        existe: true
      });
      setTimeout(() => {
        this.mostrarAlerta.set({
          texto: '',
          existe: false
        });
      }, 2000);

    } catch (error) {
      console.log(error)
    }

  }

  async mostrarEventosRegistrados() {

    const eventos = await this.serv.obterEventosProtocolo(this.idProtocolo);
    const d0 = eventos.find(e => e.tipo_evento == 'D0');
    const d7 = eventos.find(e => e.tipo_evento == 'D7');
    const ia = eventos.find(e => e.tipo_evento == 'IA');
    const dg = eventos.find(e => e.tipo_evento == 'DG');

    let progresso = 0;

    if (d0) progresso += 25;

    if (d7) progresso += 25

    if (ia) progresso += 25

    if (dg) progresso += 25

    this.barraProgresso.set(progresso);
  }

  async mostrarEventoD0() {

    try {
      const data = await this.serv.obterEventoD0Registrado(this.idProtocolo)

      this.estadoD0.set('Concluido');
      this.estadoD7.set('Disponivel')

      const evento = {
        ...data,
        evento_d0: data.evento_d0[0]
      }

      this.dadosEventoD0Registrado.set(evento);

    } catch (error) {
      console.log(error)
    }

  }

  getClasseCard(estado: string) {

    switch (estado) {
      case 'Concluido':
        return 'card-sucesso';
      case 'Disponivel':
        return 'card-disponivel';

      default:
        return 'card-bloqueado';
    }

  }

  editarEvento(tipo: 'D0' | 'D7' | 'IA' | 'DG') {

    this.esconderBtnEditar.set(false);
    this.esconderMsgEdit.set(false);

    this.editando.update(valor => ({
      ...valor,
      [tipo]: true
    }));

    setTimeout(() => {
      this.esconderMsgEdit.set(true);
    }, 2000);

  }

  desabilitarCampos(tipo: 'D0' | 'D7' | 'IA' | 'DG') {
    return !this.editando()[tipo];
  }

  cancelarEdit(tipo: 'D0' | 'D7' | 'IA' | 'DG') {
    this.esconderBtnEditar.set(true);

    this.editando.update(valor => ({
      ...valor,
      [tipo]: false
    }));

  }

  async salvarEventoD0() {

    try {

      await this.serv.atualizarEventoProtocolo({
        id: this.dadosEventoD0Registrado().id,
        data: this.dadosEventoD0Registrado().data,
        hora_inicio: this.dadosEventoD0Registrado().hora_inicio,
        observacoes: this.dadosEventoD0Registrado().observacoes
      });

      await this.serv.atualizarEventoD0({
        id: this.dadosEventoD0Registrado().evento_d0.id,
        peso: this.dadosEventoD0Registrado().evento_d0.peso,
        ecc: this.dadosEventoD0Registrado().evento_d0.ecc,
        ava: this.dadosEventoD0Registrado().evento_d0.ava,
        indutor: this.dadosEventoD0Registrado().evento_d0.indutor,
        medicamento: this.dadosEventoD0Registrado().evento_d0.medicamento,
      });

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


    } catch (error) {
      console.log(error);
    }

  }

  async cadastrarNovoEventoD7() {

    const payload = {
      ... this.evento_protocolo(),
      protocolo_id: this.idProtocolo,
      status: 'Em andamento',
      tipo_evento: 'D7'
    }

    try {
      const evento = await this.serv.registrarEvento(payload);

      if (!evento) {
        return;
      }

      const payloadD7 = {
        ...this.evento_d7(),
        evento_protocolo_id: evento.id
      }

      await this.serv.registrarDadosD7(payloadD7);
      this.limparCampos('D7')
      this.fecharFormCadastrarEventoProtocolo('D7')
      this.mostrarEventosRegistrados();
      this.mostrarEventoD7();

      this.mostrarAlerta.set({
        texto: 'D7 cadastrado com sucesso',
        existe: true
      });
      setTimeout(() => {
        this.mostrarAlerta.set({
          texto: '',
          existe: false
        });
      }, 2000);

    } catch (error) {
      console.log(error)
    }

  }

  async mostrarEventoD7() {

    try {
      const data = await this.serv.obterEventoD7Registrado(this.idProtocolo)

      this.estadoD7.set('Concluido');
      this.estadoIA.set('Disponivel')

      const evento = {
        ...data,
        evento_retirada_implante: data.evento_retirada_implante[0]
      }

      this.dadosEventoD7Registrado.set(evento);

    } catch (error) {
      console.log(error)
    }

  }


  limparCampos(tipo: 'D0' | 'D7') {

    switch (tipo) {
      case 'D0':
        this.evento_protocolo.set(this.colunasProtocolo());
        this.evento_d0.set(this.colunasEventoD0());

        break;
      case 'D7':
        this.evento_protocolo.set(this.colunasProtocolo());
        this.evento_d7.set(this.colunasEventoD7());
        break;


      default:
        break;
    }

  }

}
