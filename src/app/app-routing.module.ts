import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarSuplementosComponent } from './pages/listar-suplementos/listar-suplementos.component';
import { CadastrarSuplementoComponent } from './pages/cadastrar-suplemento/cadastrar-suplemento.component';
import { TelaLoginComponent } from './pages/tela-login/tela-login.component';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'listarSuplementos',
    component: ListarSuplementosComponent
  },
  {
    path: 'cadastrarSuplemento',
    component: CadastrarSuplementoComponent
  },
  {
    path: 'login',
    component: TelaLoginComponent
  },
  {
    path: 'loginCadastrar',
    component: CadastrarUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
