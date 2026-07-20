import { Injectable } from '@angular/core';
import { supabase } from '../core/supabase.client';

interface LoginForm {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {


  async entrar(form: LoginForm) {
    return await supabase.auth.signInWithPassword({
      email: form.email, 
      password: form.password
    }); 
  }

  async getUser() {
    return await supabase.auth.getUser(); 
  }

  async sair() {
    return await supabase.auth.signOut(); 
  }


}
