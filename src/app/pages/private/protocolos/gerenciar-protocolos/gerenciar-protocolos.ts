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
  barraProgresso = signal(0); 
  abrirForm = signal({
    tipo: '',
    aberto: false
  })

  evento_protocolo = signal(this.colunasProtocolo());
  evento_d0 = signal(this.colunasEventoD0())

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
    this.getIdProtocolo();
    this.mostrarDadosProtocolo();
    this.mostrarEventoD0(); 
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
      this.limparCampos('D0')

    } catch (error) {
      console.log(error)
    }

  }


  async mostrarEventoD0() {
    
    const eventos = await this.serv.obterEventosProtocolo(this.idProtocolo); 
    const d0 = eventos.find(e => e.tipo_evento == 'D0'); 
    const d7 = eventos.find(e => e.tipo_evento == 'D7'); 
    const ia = eventos.find(e => e.tipo_evento == 'IA'); 
    const dg = eventos.find(e => e.tipo_evento == 'DG'); 

    let progresso = 0; 

    if (d0) {
      progresso += 25; 
    }

    if (d7) {
      progresso += 25
    }

    if (ia) {
      progresso += 25
    }

    if (dg) {
      progresso += 25
    }

    this.barraProgresso.set(progresso); 
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
