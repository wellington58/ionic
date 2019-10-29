import { Component, OnInit } from '@angular/core';
import { Entrega } from 'src/app/model/entrega';
import { EntregaService } from 'src/app/services/entrega.service';
import { ActivatedRoute } from '@angular/router';
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions,
  CameraPosition, MarkerOptions, Marker,  Environment
} from '@ionic-native/google-maps';


@Component({
  selector: 'app-perfil-entrega',
  templateUrl: './perfil-entrega.page.html',
  styleUrls: ['./perfil-entrega.page.scss'],
})
export class PerfilEntregaPage implements OnInit {

  protected entrega: Entrega = new Entrega;
  protected id: string = null;
  protected map: GoogleMap;

  protected slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1,
  }

  constructor(
    protected entregaService: EntregaService,
    protected activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.entregaService.get(this.id).subscribe(
        res => {
          this.entrega = res
          this.loadMap()
        },
        erro => this.id = null
      )
    }
  }

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
    
    var cityCircle = this.map.addCircle({
      strokeColor: '#008000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      center: {lat: this.entrega.lat, lng: this.entrega.lng},
      radius: (1 * 200)
    });
    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'green',
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

}
