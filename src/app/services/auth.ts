import { Injectable } from '@angular/core';
import { supabase } from '../core/supabase.client';

@Injectable({
  providedIn: 'root',
})
export class Auth {


  async entrar(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email, 
      password
    }); 
  }

  async getUser() {
    return await supabase.auth.getUser(); 
  }

  async sair() {
    return await supabase.auth.signOut(); 
  }


}
