import { Component, OnInit, signal } from '@angular/core';
import { FazendasService } from '../../../../services/fazendas-service'
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-fazendas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './fazendas.html',
  styleUrl: './fazendas.scss',
})
export class Fazendas implements OnInit {

  constructor(
    private serv: FazendasService,
    private route: Router
  ) { }

  fazendas = signal<any[]>([]);
  isLoadin = signal(false);  

  ngOnInit(): void {
    this.mostraFazendas()
  }

  async mostraFazendas() {

    this.isLoadin.set(true); 

    const data: any = await this.serv.getFazendas();

    this.fazendas.set(data);
    this.isLoadin.set(false); 
    console.log(data)

  }

  verDetalhe(id: number) {
    this.route.navigate(['/fazenda', id]);
  }

  mostrarLoding() {
    return this.isLoadin() && this.fazendas.length == 0
  }



}
