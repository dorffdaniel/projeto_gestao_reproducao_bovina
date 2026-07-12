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
    estado: '' 
  }); 


  criarFazenda() {

    if (!this.verificarCampos()) {
      console.log("campos em falta"); 
      return; 
    }

    console.log(this.fazenda().nome)
    console.log(this.fazenda().proprietario)
    console.log(this.fazenda().telefone)
    console.log(this.fazenda().cidade)
    console.log(this.fazenda().estado)

  }

  verificarCampos() {
    
    if (!this.fazenda().nome || !this.fazenda().proprietario || !this.fazenda().telefone || !this.fazenda().cidade || !this.fazenda().estado) {
      return false; 
    }

    return true; 
  }


}
