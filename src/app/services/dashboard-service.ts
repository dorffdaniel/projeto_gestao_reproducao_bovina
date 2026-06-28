import { Injectable } from '@angular/core';
import { supabase } from '../core/supabase.client';
import { Auth } from '../services/auth'


@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor(
    private serv: Auth
  ) { }

  async getTotalFazendas() {

    const session = await this.serv.getUser();

    const user = session.data.user;

    const { data, error } = await supabase.from('fazendas').select('*').eq('perfil_id', user?.id);

    if (error) {
      console.log(error)
      return;
    }

    return data; 

  }


}
