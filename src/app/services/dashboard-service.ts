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

  async getProtocolosAtivo() {

    const { data, error } = await supabase.from('protocolos').select('*');

    if (error) {
      throw error;
    }

    return data;

  }
  async obterProtocolosEmAndamento() {

    const { data, error } = await supabase
      .from('protocolos')
      .select(`*, eventos_protocolo(*)`)
      .eq('status', 'Em andamento');

    if (error) throw error;

    return data;
  }

  async obterDGPendentes() {

    const protocolos = await this.obterProtocolosEmAndamento();

    return protocolos.filter(protocolo => {

      const temIA = protocolo.eventos_protocolo.some(
        (e: any) => e.tipo_evento === 'IA'
      );

      const temDG = protocolo.eventos_protocolo.some(
        (e: any) => e.tipo_evento === 'DG'
      );

      return temIA && !temDG;

    });

  }





}
