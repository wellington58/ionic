import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  protected usuario: Usuario = new Usuario

  constructor(
    protected usuarioService:UsuarioService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  onsubmit(form){
    this.usuarioService.save(this.usuario).then(
      res=>{
        console.log("Cadastrado!");
        this.presentAlert("aviso", "cadastrado com sucesso!")

      },
      erro=>{
        console.log("erro: " + erro);
        this.presentAlert("erro", "erro ao cadastrar!")
      }
      )
      
    }

    async presentAlert(titulo:string, texto:string) {
      const alert = await this.alertController.create({
        header: titulo,
        //subHeader: 'Subtitle',
        message: texto,
        buttons: ['OK']
      });
  
      await alert.present();
    }  
}
