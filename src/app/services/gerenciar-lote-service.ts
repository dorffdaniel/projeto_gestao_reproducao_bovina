import { Injectable } from '@angular/core';
import { supabase } from '../core/supabase.client';

@Injectable({
  providedIn: 'root',
})
export class GerenciarLoteService {
  

  async getDadaosLote(idlote: number) {
    
    const { data, error } = await supabase.from('lotes').select('*').eq('id', idlote).single(); 

    if (error) {
      throw error; 
    }

    return data; 

  }


  async registrarProtocolo(payload: any) {
    
    const { data, error } = await supabase.from('protocolos').insert(payload); 

    if (error) {
      throw error
    }

    return data; 
  }

  async getDadosProtocolos(lote_id: number) {
    
    const { data, error } = await supabase.from('protocolos').select('*').eq('lote_id', lote_id).order('data_inicio', { ascending: false });
    
    if (error) {
      throw error
    }

    return data; 
  }


}
