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

  evento_protocolo = signal(this.colunasProtocolo());
  evento_d0 = signal(this.colunasEventoD0())
  isLoading = signal(false);
  nomeResponsavel = signal<string | null>(null);
  estadoD0 = signal('Disponivel');
  estadoD7 = signal('Bloqueado');
  estadoIA = signal('Bloqueado');
  estadoDG = signal('Bloqueado');
  dadosEventoD0Registrado = signal<any | null>(null);
  desabilitarBtnD0 = signal(true);
  esconderBtnEditar = signal(true);

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

  ngOnInit(): void {
    this.mostrarDadosperfilResponsavel();
    this.getIdProtocolo();
    this.mostrarDadosProtocolo();
    this.mostrarEventosRegistrados();
    this.mostrarEventoD0();
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


  abrirFormCadastrarEventoProtocolo(tipo: 'D0' | 'D7' | 'D9') {

    this.abrirForm.set({
      tipo: tipo,
      aberto: true
    })

    this.esconderBtn.set(true);
  }

  fecharFormCadastrarEventoProtocolo(tipo: 'D0' | 'D7' | 'D9') {
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
      const evento = await this.serv.registrarEventoD0(payload);

      if (!evento) {
        return;
      }

      const payloadD0 = {
        ...this.evento_d0(),
        evento_protocolo_id: evento.id
      }

      await this.serv.registrarDadosD0(payloadD0);
      this.limparCampos('D0')

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

      console.log("d0 registrado ", data);
      this.estadoD0.set('Concluido');
      this.estadoD7.set('Disponivel')
      this.dadosEventoD0Registrado.set(data);

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

  editarEvento(tipo: string) {

    if (tipo == 'D0') {
      this.desabilitarBtnD0.set(false);
      this.esconderBtnEditar.set(false);
    }

  }

  cancelarEdit(tipo: string) {

    if (tipo == 'D0') {
      this.desabilitarBtnD0.set(true);
      this.esconderBtnEditar.set(true);
    }

  }



  limparCampos(tipo: 'D0' | 'D7') {

    switch (tipo) {
      case 'D0':
        this.evento_protocolo.set(this.colunasProtocolo());
        this.evento_d0.set(this.colunasEventoD0());

        break;

      default:
        break;
    }

  }

}
