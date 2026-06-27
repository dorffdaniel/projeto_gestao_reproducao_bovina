import { Component, OnInit, signal } from '@angular/core';
import { FazendasService } from '../../../services/fazendas-service'


@Component({
  selector: 'app-fazendas',
  imports: [],
  templateUrl: './fazendas.html',
  styleUrl: './fazendas.scss',
})
export class Fazendas implements OnInit{

  constructor(private serv: FazendasService) { }

  fazendas = signal<any[]>([]); 

  ngOnInit(): void {
    this.mostraFazendas()
  }

  async mostraFazendas() {
    const data: any = await this.serv.getFazendas(); 

    this.fazendas.set(data); 
    console.log(data)
    
  }

}
