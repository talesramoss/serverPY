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

  formualario !: FormGroup

  suplemento = {
    id: 0,
    nomeSuplemento: '',
    marca: '',
    valor: ''
  }

  constructor(
    private suplementoService: SuplementosService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formualario = this.formBuilder.group({
      id: [0],
      nome: ['', Validators.compose([Validators.required])],
      marca: ['', Validators.compose([Validators.required])],
      valor: ['', Validators.compose([Validators.required])]
    })
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
