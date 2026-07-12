import { Injectable } from '@angular/core';
import { supabase } from '../core/supabase.client';
import { Auth } from '../services/auth'

@Injectable({
  providedIn: 'root',
})
export class FazendasService {

  constructor(private ser: Auth) { }


  async getFazendas() {

    const session = await this.ser.getUser();

    const user = session?.data?.user;

    if (!user) return null;

    const { data, error } = await supabase.from('fazendas').select('*').eq('perfil_id', user.id)

    if (error) {
      console.log(error);
      return;
    }

    return data;

  }

  async cadastrarFazenda(fazenda: any) {

    const session = await this.ser.getUser();

    const user = session?.data?.user;

    if (!user?.id) {
      throw new Error("Usuario não autenticado");
    }

    const { data, error } = await supabase.from('fazendas').insert({
      nome: fazenda.nome,
      proprietario: fazenda.proprietario,
      telefone: fazenda.telefone,
      cidade: fazenda.cidade,
      estado: fazenda.estado,
      perfil_id: user?.id
    }).select();

    if (error) {
      throw error;
    }

    return data;

  }


}
