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


}
