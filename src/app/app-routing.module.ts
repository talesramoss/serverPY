import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarSuplementosComponent } from './pages/listar-suplementos/listar-suplementos.component';
import { CadastrarSuplementoComponent } from './pages/cadastrar-suplemento/cadastrar-suplemento.component';
import { TelaLoginComponent } from './pages/tela-login/tela-login.component';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ExcluirComponent } from './pages/excluir/excluir.component';
import { HomeComponent } from './pages/home/home.component';

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
  },
  { path: 'editar/:id',
    component: EditarComponent },
  {
    path: 'excluirSuplemento',
    component: ExcluirComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
