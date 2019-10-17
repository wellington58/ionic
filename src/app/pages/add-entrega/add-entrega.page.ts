import { Component, OnInit } from '@angular/core';
import { Entrega } from 'src/app/model/entrega';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { EntregaService } from 'src/app/services/entrega.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-add-entrega',
  templateUrl: './add-entrega.page.html',
  styleUrls: ['./add-entrega.page.scss'],
})
export class AddEntregaPage implements OnInit {

  protected entrega: Entrega = new Entrega
  protected id: string = null
  protected preview: string = null;
  protected slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  

 
  constructor(
    protected entregaService:EntregaService,
    protected router:Router,
    protected alertController: AlertController,
    protected activedRoute: ActivatedRoute,
    private camera: Camera,

  ) { }

  ngOnInit() { }
  
  //funçao chamada toda vez que a pagina recebe foco;
  ionViewWillEnter(){
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

  tirarFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.preview = base64Image;
    }, (err) => {
      // Handle error
    });
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
