import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GerenciarProtocoloService } from '../../../../services/gerenciar-protocolo-service';


@Component({
  selector: 'app-gerenciar-protocolos',
  imports: [],
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

  ngOnInit(): void {
    this.getIdProtocolo();
    this.mostrarDadosProtocolo();
  }

  getIdProtocolo() {
    const id = Number(this.rota.snapshot.paramMap.get('id'));

    if (!id) {
      this.route.navigate(['/fazendas']);
    }

    console.log("id", id)
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

  voltar() {
    alert("em andamento")
  }


}
