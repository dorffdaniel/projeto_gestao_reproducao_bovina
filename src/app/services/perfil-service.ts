import { Injectable } from '@angular/core';
import { supabase } from '../core/supabase.client';


@Injectable({
  providedIn: 'root',
})
export class PerfilService {


  async getPerfil() {

    const session = await supabase.auth.getSession();

    const user = session.data.session?.user;
    if (!user) return null;

    const { data, error } = await supabase.from('perfis').select('*').eq('id', user.id).single();

    return data;
  }


}
