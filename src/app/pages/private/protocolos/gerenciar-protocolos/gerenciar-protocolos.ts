import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GerenciarProtocoloService } from '../../../../services/gerenciar-protocolo-service';
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
    private serv: GerenciarProtocoloService
  ) { }

  idProtocolo!: number;
  dadosProtocolo = signal<any>(null);
  esconderBtn = signal(false);
  abrirForm = signal({
    tipo: '',
    aberto: false
  })

  evento_protocolo = signal({
    data: '',
    hora_inicio: '',
    observacoes: '',
  });

  evento_d0 = signal({
    peso: '',
    ecc: '',
    ava: '',
    indutor: '',
    medicamento: ''
  })


  ngOnInit(): void {
    this.getIdProtocolo();
    this.mostrarDadosProtocolo();
  }

  getIdProtocolo() {
    const id = Number(this.rota.snapshot.paramMap.get('id'));

    if (!id) {
      this.route.navigate(['/fazendas']);
    }

    this.idProtocolo = id;
  }

  async mostrarDadosProtocolo() {

    const data = await this.serv.obterDadosProtocolo(this.idProtocolo);

    this.dadosProtocolo.set(data);
    console.log("Dados prot: ", data)

  }

  editarProt() {
    alert("em andamento")
  }

  abrirFormCadastrarEventoProtocolo(tipo: 'D0' | 'D7' | 'D9') {

    this.abrirForm.set({
      tipo: tipo,
      aberto: true
    })

    this.esconderBtn.set(true);
  }


  voltar() {
    alert("em andamento")
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

    } catch (error) {
      console.log(error)
    }

  }



}
