import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarSuplementosComponent } from './pages/listar-suplementos/listar-suplementos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CadastrarSuplementoComponent } from './pages/cadastrar-suplemento/cadastrar-suplemento.component';
import { CabecalhoComponent } from './pages/cabecalho/cabecalho.component';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ListarSuplementosComponent,
    CadastrarSuplementoComponent,
    CabecalhoComponent,
    CadastrarUsuarioComponent,
  ],
  imports: [

    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
