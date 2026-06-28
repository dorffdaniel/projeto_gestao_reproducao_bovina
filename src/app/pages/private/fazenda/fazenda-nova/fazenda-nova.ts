import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-fazenda-nova',
  standalone: true, 
  imports: [RouterLink, FormsModule],
  templateUrl: './fazenda-nova.html',
  styleUrl: './fazenda-nova.scss',
})
export class FazendaNova {



  fazenda = signal({
    nome: '', 
    proprietario: '', 
    telefone: '', 
    cidade: '', 
    estado: '', 
    tipo_controle: '' 
  }); 


  criarFazenda() {

    if (!this.verificarSelect()) {
      console.log("selecione um tipo controle valido")
      return; 
    }

    if (!this.verificarCampos()) {
      console.log("campos em falta"); 
      return; 
    }

    console.log(this.fazenda().nome)
    console.log(this.fazenda().proprietario)
    console.log(this.fazenda().telefone)
    console.log(this.fazenda().cidade)
    console.log(this.fazenda().estado)
    console.log(this.fazenda().tipo_controle)

  }

  verificarCampos() {
    
    if (!this.fazenda().nome || !this.fazenda().proprietario || !this.fazenda().telefone || !this.fazenda().cidade || !this.fazenda().estado || !this.fazenda().tipo_controle) {
      return false; 
    }

    return true; 
  }

  verificarSelect() {
    if (this.fazenda().tipo_controle == '-1') {
      return false; 
    }

    return true; 
  }


}
