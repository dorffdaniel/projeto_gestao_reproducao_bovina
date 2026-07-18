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


}
