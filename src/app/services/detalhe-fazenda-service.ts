import { Injectable } from '@angular/core';
import { supabase } from '../core/supabase.client';


@Injectable({
  providedIn: 'root',
})
export class DetalheFazendaService {


  async getDetalheDazenda(id: number) {

    const { data, error } = await supabase.from('fazendas').select('*').eq('id', id).single();

    if (error) {
      console.log(error);
      return;
    }

    return data;

  }

  async salvarEdicaoFazenda(id: number, fazenda: any) {

    const { data, error } = await supabase.from('fazendas').update({
      nome: fazenda.nome,
      proprietario: fazenda.proprietario,
      telefone: fazenda.telefone,
      cidade: fazenda.cidade,
      estado: fazenda.estado
    }).eq('id', id).select().single();

    if (error) {
      console.log(error)
      return;
    }

    return data;

  }

  async getLotes(fazenda_id: number) {

    const { data, error } = await supabase.from('lotes').select('*').eq('fazenda_id', fazenda_id);

    if (error) {
      console.log(error);
      return
    }

    return data;

  }

  async cadastrarLote(lote: any) {

    const { data, error } = await supabase.from('lotes').insert({
      fazenda_id: lote.fazenda_id,
      nome: lote.nome,
      total_animais: lote.quantidade,
      observacoes: lote.observacao, 
      categoria: lote.categoria
    })

    if (error) {
      console.log(error);
      return;
    }

    return data;
  }





}
