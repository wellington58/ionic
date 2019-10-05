import { Component } from '@angular/core';
import { EntregaService } from '../services/entrega.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  protected entregas: any

  constructor(
    protected entregaService:EntregaService,
    protected router:Router
  ) {}

  ngOnInit() {
    this.entregas = this.entregaService.getAll();
  }

  editar(key) {
    this.router.navigate(['../tabs/addEntrega', key])
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
