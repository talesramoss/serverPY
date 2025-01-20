import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrl: './tela-login.component.scss'
})
export class TelaLoginComponent {

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  entrar(){
    this.router.navigate(['/listarSuplementos'])
  }

  login(form: NgForm) {
    if(form.valid) {
      this.router.navigate(['/listarSuplemento'])
    } else {
      alert('Formulário inválido')
    }
  }
}
