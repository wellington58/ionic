import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.page.html',
  styleUrls: ['./list-usuario.page.scss'],
})
export class ListUsuarioPage implements OnInit {

  protected usuarios: any

  constructor(
    protected usuarioService: UsuarioService,
    public loadingController: LoadingController,
    protected router: Router,
    protected alertController: AlertController
  ) { }

  ngOnInit() {
    this.usuarios = this.usuarioService.getAll();
  }

  editar(key) {
    this.router.navigate(['../tabs/addUsuario', key])
  }

  async remover(key) {
    const alert = await this.alertController.create({
      header: 'deletar',
      message: 'Tem certeza que deseja deletar os dados?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Apagar',
          handler: () => {
            this.usuarioService.remover(key);
          }
        }
      ]
    });

    await alert.present();
  }

  async doRefresh(event) {
    console.log('Begin async operation')
    this.usuarios = await this.usuarioService.getAll();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }

}
