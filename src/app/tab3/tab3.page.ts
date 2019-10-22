import { Component } from '@angular/core';
import { EntregaService } from '../services/entrega.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  protected entregas: any

  constructor(
    protected entregaService:EntregaService,
    protected router:Router,
    protected alertController:AlertController
  ) {}

  ngOnInit() {
    this.entregas = this.entregaService.getAll();
  }

  editar(key) {
    this.router.navigate(['../tabs/addEntrega', key])
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
            this.entregaService.remover(key);
          }
        }
      ]
    });
    await alert.present();
  }


  

  async doRefresh(event){
    console.log('begin async operation')
    this.entregas = await this.entregaService.getAll();

   setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
    
  }

}
