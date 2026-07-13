import { Injectable } from '@angular/core';
import { supabase } from '../core/supabase.client';

@Injectable({
  providedIn: 'root',
})
export class GerenciarLoteService {
  

  async getDadaosLote(idlote: number) {
    
    const { data, error } = await supabase.from('lotes').select('*').eq('id', idlote); 

    if (error) {
      throw error; 
    }

    return data; 

  }



}
