import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarSuplementosComponent } from './pages/listar-suplementos/listar-suplementos.component';
import { CadastrarSuplementoComponent } from './pages/cadastrar-suplemento/cadastrar-suplemento.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listarSuplementos',
    pathMatch: 'full'
  },
  {
    path: 'listarSuplementos',
    component: ListarSuplementosComponent
  },
  {
    path: 'cadastrarSuplemento',
    component: CadastrarSuplementoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
