import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrl: './tela-login.component.scss'
})
export class TelaLoginComponent {

  formulario !: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [''],
      email: [''],
      senha: ['']
    })
  }
}
