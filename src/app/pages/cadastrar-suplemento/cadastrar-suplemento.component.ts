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

  formulario !: FormGroup

  constructor(
    private suplementoService: SuplementosService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [0],
      nomeSuplemento: ['', Validators.compose([Validators.required])],
      marca: ['', Validators.compose([Validators.required])],
      valor: ['', Validators.compose([Validators.required, Validators.pattern("\\d{1,3}(\\.\\d{3})*,\\d{2}")])]
    })
  }

  criarSuplemento(){
    if(this.formulario.valid) {
      this.suplementoService.criarSuplementos(this.formulario.value).subscribe( () => {
        console.log('informações suplementos', this.formulario.value)
        this.router.navigate(['/listarSuplementos'])
      })

    }
  }

  cancelar() {
    this.router.navigate(['/listarSuplementos'])
  }

}
