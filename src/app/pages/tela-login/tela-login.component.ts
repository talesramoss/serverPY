import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrl: './tela-login.component.scss'
})
export class TelaLoginComponent {

  formularioUser !: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioUser = this.formBuilder.group({
      id: [0],
      email: ['', Validators.compose([Validators.required])],
      senha: ['', Validators.compose([Validators.required])]
    })
  }

  entrar(){
    if(this.formularioUser.valid) {
      this.router.navigate(['/listarSuplemento'])
    }
  }

  cadastrar() {
    this.router.navigate(['/loginCadastrar'])
  }
}
