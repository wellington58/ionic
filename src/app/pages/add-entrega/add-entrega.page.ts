import { Component, OnInit } from '@angular/core';
import { Entrega } from 'src/app/model/entrega';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { EntregaService } from 'src/app/services/entrega.service';

@Component({
  selector: 'app-add-entrega',
  templateUrl: './add-entrega.page.html',
  styleUrls: ['./add-entrega.page.scss'],
})
export class AddEntregaPage implements OnInit {

  protected entrega: Entrega = new Entrega
  protected id: string = null
 
  constructor(
    protected entregaService:EntregaService,
    protected router:Router,
    protected alertController: AlertController,
    protected activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.paramMap.get("id");
    if(this.id){
      this.entregaService.get(this.id).subscribe(
        res=>{
          this.entrega = res
        },
        erro=> this.id = null

      )
    }
  }

  onsubmit(form){
    if(this.id){
      this.entregaService.update(this.entrega, this.id).then(
        res=>{
          console.log("Atualizado");
          this.presentAlert("aviso", "Atualizado com sucesso!")
          form.reset()
          this.entrega = new Entrega;
          this.router.navigate(['/tabs/tab3']);
          
        },
        erro=>{
          console.log("erro: " + erro);
          this.presentAlert("erro", "erro ao Atualizar!")
          
        }
      )
    }else{
      this.entregaService.save(this.entrega).then(
        res=>{
          console.log("Cadastrado!");
          this.presentAlert("aviso", "cadastrado com sucesso!")
          form.reset()
          this.entrega = new Entrega
          this.router.navigate(['/tabs/tab3'])
          
        },
        erro=> {
          console.log("erro: "+ erro);
          this.presentAlert("erro", "erro ao cadastrar!")
          
        }
      )
    }
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
