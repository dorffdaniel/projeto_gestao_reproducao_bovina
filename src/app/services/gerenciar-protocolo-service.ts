import { Injectable } from '@angular/core';
import { supabase } from '../core/supabase.client';

@Injectable({
  providedIn: 'root',
})
export class GerenciarProtocoloService {

  async obterDadosProtocolo(idProtocolo: number) {

    const { data, error } = await supabase.from('protocolos').select(`*, lotes( id, nome ), fazendas(id, nome)`).eq('id', idProtocolo).single();

    if (error) {
      throw error
    }

    return data;
  }

  // registro de todos os eventos
  async registrarEvento(payload: any) {

    const { data, error } = await supabase.from('eventos_protocolo').insert(payload).select().single();

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


  async obterEventosProtocolo(idProtocolo: number) {

    const { data, error } = await supabase.from('eventos_protocolo').select('*').eq('protocolo_id', idProtocolo);

    if (error) {
      throw error
    }

    return data;
  }

  async obterEventoD0Registrado(idProtocolo: number) {

    const { data, error } = await supabase.from('eventos_protocolo').select(`*, evento_d0(*)`).eq('protocolo_id', idProtocolo).eq('tipo_evento', 'D0')
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  // sempre atualizo os eventos aqui.
  async atualizarEventoProtocolo(payload: any) {

    const { id, ...dados } = payload;

    const { error } = await supabase.from('eventos_protocolo').update(dados).eq('id', id);

    if (error) throw error;

  }


  async atualizarEventoD0(payload: any) {

    const { id, ...dados } = payload;

    const { error } = await supabase.from('evento_d0').update(dados).eq('id', id);

    if (error) throw error;

  }


  async registrarDadosD7(payload: any) {

    const { data, error } = await supabase.from('evento_retirada_implante').insert(payload);

    if (error) throw error;

    return data;

  }

  async obterEventoD7Registrado(idProtocolo: number) {

    const { data, error } = await supabase.from('eventos_protocolo').select(`*, evento_retirada_implante(*)`).eq('protocolo_id', idProtocolo).eq('tipo_evento', 'D7')
      .single()

    if (error) throw error;

    return data;

  }

  async registrarDadosIA(payload: any) {

    const { data, error } = await supabase.from('evento_ia').insert(payload);

    if (error) throw error;

    return data;
  }


  async obterEventoIARegistrado(idProtocolo: number) {

    const { data, error } = await supabase.from('eventos_protocolo').select(`*, evento_ia(*)`).eq('protocolo_id', idProtocolo).eq('tipo_evento', 'IA')
      .single()

    if (error) throw error;

    return data;

  }

  async registrarDadosDG(payload: any) {

    const { data, error } = await supabase.from('evento_dg').insert(payload);

    if (error) throw error;

    return data;
  }


  async obterEventoDGRegistrado(idProtocolo: number) {

    const { data, error } = await supabase.from('eventos_protocolo').select(`*, evento_dg(*)`).eq('protocolo_id', idProtocolo).eq('tipo_evento', 'DG')
      .maybeSingle(); 

    if (error) throw error;

    return data;

  }

  async finalizarProtocolo(payload: any) {

    const {id, ...dados} = payload
    
    const { data, error } = await supabase.from('protocolos').update(dados).eq('id', id)
    
    if (error) throw error; 

    return data; 

  }


}
