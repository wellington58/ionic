import { Component } from '@angular/core';
import { EntregaService } from '../services/entrega.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  protected quantEntrega:number = 0;
  protected quantUsuario:number = 0;

  constructor(
    protected entregaService:EntregaService,
    protected usuarioService:UsuarioService
  ) {
    this.entregaService.getAll().subscribe(
      res=>{
        this.quantEntrega = res.length
      }
    )

    this.usuarioService.getAll().subscribe(
      res=>{
        this.quantUsuario = res.length
      }
    )
  }

  ngOnInit() {}

}
