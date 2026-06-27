import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-fazenda-detalhe',
  imports: [],
  templateUrl: './fazenda-detalhe.html',
  styleUrl: './fazenda-detalhe.scss',
})
export class FazendaDetalhe implements OnInit {

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.getIdDetalheFazenda(); 
  }

  getIdDetalheFazenda() {

    const id = Number(this.route.snapshot.paramMap.get('id')); 

    console.log(id) 

  }

  


}
