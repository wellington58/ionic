import { Component, OnInit } from '@angular/core';
import { Entrega } from 'src/app/model/entrega';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { EntregaService } from 'src/app/services/entrega.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions,
  CameraPosition, MarkerOptions, Marker,  Environment } from '@ionic-native/google-maps';


@Component({
  selector: 'app-add-entrega',
  templateUrl: './add-entrega.page.html',
  styleUrls: ['./add-entrega.page.scss'],
})
export class AddEntregaPage implements OnInit {

  protected entrega: Entrega = new Entrega
  protected id: string = null
  protected preview: string[]=null;
  protected map: GoogleMap
  protected slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 3,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  }};
  

 
  constructor(
    protected entregaService:EntregaService,
    protected router:Router,
    protected alertController: AlertController,
    protected activedRoute: ActivatedRoute,
    private geolocation: Geolocation,
    private camera: Camera,

  ) { }

  ngOnInit() {
    this.localAtual();
    
   }
  
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
    this.entrega.fotos = this.preview;
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

  localAtual() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.entrega.lat = resp.coords.latitude
      this.entrega.lng = resp.coords.longitude
      this.loadMap();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      if(!this.preview){
        this.preview = []};
      this.preview.push(base64Image);
    }, (err) => {
      // Handle error
    });
  }

 /* limparForm(form) {
    this.preview = null;
    form.reset()
  }*/


  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: this.entrega.lat,
           lng: this.entrega.lng
         },
         zoom: 18,
         tilt: 30
       }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.entrega.lat,
        lng: this.entrega.lng
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
      res=>{
        console.log(res);
        marker.setPosition(res[0]);
        this.entrega.lat = res[0].lat;
        this.entrega.lng = res[0].lng;
        
      }
    )
  }

  async removerFoto(index){

    const alert = await this.alertController.create({
      header: 'Apagar',
      message: 'Tem certeza que deseja deletar a foto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.preview.splice(index,1)
          }
        }
      ]
    });
    await alert.present();
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
