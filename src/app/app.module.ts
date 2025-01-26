import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarSuplementosComponent } from './pages/listar-suplementos/listar-suplementos.component';
import { CadastrarSuplementoComponent } from './pages/cadastrar-suplemento/cadastrar-suplemento.component';
import { TelaLoginComponent } from './pages/tela-login/tela-login.component';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ExcluirComponent } from './pages/excluir/excluir.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarSuplementosComponent,
    CadastrarSuplementoComponent,
    TelaLoginComponent,
    CadastrarUsuarioComponent,
    EditarComponent,
    ExcluirComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
