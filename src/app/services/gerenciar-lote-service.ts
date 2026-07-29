import { Injectable } from '@angular/core';
import { supabase } from '../core/supabase.client';

@Injectable({
  providedIn: 'root',
})
export class GerenciarLoteService {
  

  async getDadosLote(idlote: number) {
    
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


  async atualizarLote(payload: any) {

    const { id, ...dados } = payload;
    
    const { error } = await supabase.from('lotes').update(dados).eq('id', id); 

    if (error) throw error;  
  }



}
