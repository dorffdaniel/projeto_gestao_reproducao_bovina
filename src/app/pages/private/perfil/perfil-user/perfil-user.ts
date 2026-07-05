import { Component, ElementRef, viewChild, OnInit, signal } from '@angular/core';
import { PerfilService } from '../../../../services/perfil-service';
import { supabase } from '../../../../core/supabase.client';

@Component({
  selector: 'app-perfil-user',
  imports: [],
  templateUrl: './perfil-user.html',
  styleUrl: './perfil-user.scss',
})
export class PerfilUser implements OnInit {

  constructor(
    private serv: PerfilService
  ) { }

  userId = '';
  dadosPessoais = signal<any>(null);
  avatarUrl = signal<string | null>(null);
  inicial = signal<string | null>(null);

  ngOnInit(): void {
    this.dadosPessoaisPerfil();
    this.mostrarImagemPerfil();
    console.log(this.avatarUrl())
  }

  inputFile = viewChild<ElementRef<HTMLInputElement>>('inputFile');


  selecionarImg(event: Event) {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return
    }

    const arquivo = input.files[0];
    console.log(arquivo);

    // Mantém a extensão original
    const extensao = arquivo.name.split('.').pop();

    // Nome do arquivo baseado no UUID do usuário
    const caminho = `usuarios/${this.userId}.${extensao}`;

    this.salvandoImgStorage(caminho, arquivo)

  }

  //sALVO A IMG NO STORAGE 
  async salvandoImgStorage(caminho: string, arquivo: File) {

    const { data, error } = await supabase.storage.from('avatars').upload(caminho, arquivo, {
      upsert: true
    });

    if (error) {
      console.error(error);
      return;
    }

    await this.atualizarAvatar(data.path);
  }


  async atualizarAvatar(caminho: string) {

    const { error } = await supabase.from('perfis').update({
      avatar: caminho
    }).eq('id', this.userId);

    if (error) {
      console.log(error);
      return;
    }

    console.log("foto do perfil atualizada com sucesso");
    this.mostrarImagemPerfil();

  }


  async mostrarImagemPerfil() {

    const perfil = await this.serv.getPerfil();

    if (!perfil.avatar) {
      this.avatarUrl.set(null);
      return;
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(perfil.avatar);

    this.avatarUrl.set(`${data.publicUrl}?t=${Date.now()}`);
  }

  async dadosPessoaisPerfil() {
    const data = await this.serv.getPerfil();
    this.userId = data.id;
    this.dadosPessoais.set(data);

    if (data.nome) {
      this.inicial.set(data.nome.charAt(0).toUpperCase());
    }
  }

  acionarInputFile() {
    this.inputFile()?.nativeElement.click();
  }

  async removerImagem() {

    const perfil = await this.serv.getPerfil();

    if (!perfil.avatar) {
      return;
    }

    const { error } = await supabase.storage.from('avatars').remove([perfil.avatar]);

    if (error) {
      console.log(error)
      return;
    }

    await this.eliminandoAvatarPerfil();
  }

  async eliminandoAvatarPerfil() {

    const {error} = await supabase.from('perfis').update({
      avatar: null
    }).eq('id', this.userId);

    if (error) {
      console.log(error)
      return;
    }
 
     await this.mostrarImagemPerfil();
  }


}
