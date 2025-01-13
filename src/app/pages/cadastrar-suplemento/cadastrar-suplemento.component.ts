import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuplementosService } from '../../servicos/suplementos.service';

@Component({
  selector: 'app-cadastrar-suplemento',
  templateUrl: './cadastrar-suplemento.component.html',
  styleUrl: './cadastrar-suplemento.component.scss'
})
export class CadastrarSuplementoComponent {
  suplemento = {
    id: 0,
    nomeSuplemento: '',
    marca: '',
    valor: ''
  }

  constructor(
    private suplementoService: SuplementosService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  criarSuplemento(){
    this.suplementoService.criarSuplementos(this.suplemento).subscribe( suplementos => {
      console.log('informações suplementos', this.suplemento)
      this.router.navigate(['/listarSuplementos'])
    })
  }

  cancelar() {
    this.router.navigate(['/listarSuplementos'])
  }

}
