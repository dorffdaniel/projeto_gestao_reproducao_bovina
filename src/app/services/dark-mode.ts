import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkMode {
  
  valorInicial = signal<boolean>(false); 

  constructor() {
    this.CarregarTema()
  }

  // Esse método só serve para inicializar o tema.
  private CarregarTema() {
    
    // vai biscar para ve se tem salvo.
    const TemaSalvo = localStorage.getItem('tema'); 

    if (TemaSalvo == 'dark') {
      this.valorInicial.set(true); 
    }

    document.body.classList.toggle('darkMode', this.valorInicial()); 

  }


  adicionarToggle() {
    this.valorInicial.update(v => !v); 

    const valor = this.valorInicial(); 
  
    document.body.classList.toggle('darkMode', valor); 

    localStorage.setItem('tema',  valor ? 'dark' : 'light'); 

  }



}
