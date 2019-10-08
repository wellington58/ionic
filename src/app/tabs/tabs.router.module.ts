import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'addUsuario',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/add-usuario/add-usuario.module').then(m => m.AddUsuarioPageModule)
          }
        ]
      },
      {
        path: 'addUsuario/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/add-usuario/add-usuario.module').then(m => m.AddUsuarioPageModule)
          }
        ]
      },
      {
        path: 'listUsuario',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/list-usuario/list-usuario.module').then(m => m.ListUsuarioPageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
      path: 'addEntrega',
      children: [
        {
          path: '',
          loadChildren: () =>
            import('../pages/add-entrega/add-entrega.module').then(m => m.AddEntregaPageModule)
        }
      ]
    },
    {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
