import { Component } from '@angular/core';
import { EntregaService } from '../services/entrega.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  protected entregas: any

  constructor(
    protected entregaService: EntregaService,
    protected router:Router
  ) {}

  ngOnInit() {
    this.entregas = this.entregaService.getAll().subscribe(
      res=>{
        this.entregas = res
      }
    )
  }

  perfil(key) {
    this.router.navigate(['../tabs/perfil', key])
  }
}
