import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  protected email:string;
  protected senha:string;

  constructor(public afAuth: AngularFireAuth,
    protected router:Router,
    protected msg:MensagemService,
    ) { }

  ngOnInit() {
  }

  onsubmit(form){
    this.login()
  }

  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.senha).then(
      res=>{
        console.log(res);
        this.router.navigate(["/"])
      },
      erro=>{
        console.log(erro);
        
        this.msg.presentAlert("erro","E-mail e/ou senha invalida!")
      }
    )
  }

  loginWEB() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

}
