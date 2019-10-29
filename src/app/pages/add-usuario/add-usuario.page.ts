import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions,
  CameraPosition, MarkerOptions, Marker,  Environment
} from '@ionic-native/google-maps';



@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  protected usuario: Usuario = new Usuario
  protected id: string = null;
  protected preview: string = null;
  protected map: GoogleMap;

  constructor(
    protected usuarioService: UsuarioService,
    protected alertController: AlertController,
    protected router: Router,
    protected activedRoute: ActivatedRoute,
    private geolocation: Geolocation,
    private camera: Camera,
  ) { }


  ionViewDidLoad() {
  }
  
  ngOnInit() {
   // this.loadMap();
    this.localAtual();
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
    if (!this.preview){
      this.presentAlert("Ops!", "tire sua foto!")
    } else {
      this.usuario.foto = this.preview;
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
  }

  localAtual() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.usuario.lat = resp.coords.latitude
      this.usuario.lng = resp.coords.longitude
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
      this.preview = base64Image;
    }, (err) => {
      // Handle error
    });
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

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: this.usuario.lat,
           lng: this.usuario.lng
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
        lat: this.usuario.lat,
        lng: this.usuario.lng
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
      res=>{
        console.log(res);
        marker.setPosition(res[0]);
        this.usuario.lat = res[0].lat;
        this.usuario.lng = res[0].lng;
        
      }
    )
  }
}
