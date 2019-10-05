import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  protected usuario: Usuario = new Usuario
  protected id: string = null;

  constructor(
    protected usuarioService: UsuarioService,
    protected alertController: AlertController,
    protected router: Router,
    protected activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.usuarioService.get(this.id).subscribe(
        res => {
          this.usuario = res
        },
        erro => this.id = null
      )
    }
  }

  onsubmit(form) {
    if (this.id) {
      this.usuarioService.update(this.usuario, this.id).then(
        res => {
          console.log("Atualizado!");
          this.presentAlert("aviso", "Atualizado com sucesso!")
          form.reset()
          this.usuario = new Usuario;
          this.router.navigate(['/tabs/listUsuario']);

        },
        erro => {
          console.log("erro: " + erro);
          this.presentAlert("erro", "erro ao Atualizar!")
        }
      )
    } else {
      this.usuarioService.save(this.usuario).then(
        res => {
          console.log("Cadastrado!");
          this.presentAlert("aviso", "cadastrado com sucesso!")
          form.reset()
          this.usuario = new Usuario;
          this.router.navigate(['/tabs/listUsuario']);

        },
        erro => {
          console.log("erro: " + erro);
          this.presentAlert("erro", "erro ao cadastrar!")
        }
      )

    }
  }

  async presentAlert(titulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }
}
