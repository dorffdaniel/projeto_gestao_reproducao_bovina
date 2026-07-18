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
  dadosLote = signal<any | null>(null);
  esconderBtn = signal(false);
  mostrarFormProtocolo = signal(false);
  protocolo = signal(this.criarProtocoloVazio());
  protocolosRegistrados = signal<any>([]); 

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


  getIdlote() {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    if (!id) {
      this.naveg.navigate(['/fazendas'])
    }
    this.idLote = id;
  }


  async mostrarDadosLote() {

    try {
      const data = await this.serv.getDadaosLote(this.idLote);

      console.log(data);
      this.dadosLote.set(data);

      await this.obterProtocolosRegistrados();

    } catch (error) {
      console.log(error);
    }

  }


  voltar() {
    // de momento fica assim depois volta mesmo para pagina anterior.
    this.naveg.navigate(['/fazendas'])
  }

  editarLote() {
    alert("falta desenvolver");
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
      fazenda_id: this.dadosLote()!.fazenda_id,
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
    this.router.navigate(['/protocolo', protocolo_id]); 
  }

}
