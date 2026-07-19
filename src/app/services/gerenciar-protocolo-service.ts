import { Injectable } from '@angular/core';
import { supabase } from '../core/supabase.client';

@Injectable({
  providedIn: 'root',
})
export class GerenciarProtocoloService {
  
  async obterDadosProtocolo(idProtocolo: number) {
    
    const { data, error } = await supabase.from('protocolos').select('*').eq('id', idProtocolo).single(); 

    if (error) {
      throw error
    }

    return data; 

  }

  async registrarEventoD0(payload: any) {
    
    const { data, error } = await supabase.from('eventos_protocolo').insert(payload) .select().single(); 

    if (error) {
      throw error
    }

    return data; 

  }

  async registrarDadosD0(payload: any) {
    
    const { data, error } = await supabase.from('evento_d0').insert(payload); 

    if (error) {
      throw error
    }

    return data; 
  }


}
