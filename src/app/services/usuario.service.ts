import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    protected fire:AngularFireDatabase
  ) { }

  save(usuario){
    return this.fire.list("usuarios").push(usuario);
  }
}
