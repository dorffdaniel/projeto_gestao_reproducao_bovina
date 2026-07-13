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
    private serv: GerenciarLoteService
  ) { }

  idLote!: number;
  dadosLote = signal<any | null>(null);
  esconderBtn = signal(false); 
  mostrarFormProtocolo = signal(false); 

  protocolo = signal({
    data_inicio: '', 
    hora_inicio: '', 
    total_animais: '', 
    status: '', 
    observacoes: ''
  })


  ngOnInit(): void {
    this.getIdlote();
    this.mostrarDadosLote();
  }


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


  cadastrarNovoProtocolo() {
    
  }




}
