import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../views/usuarios/usuarios.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrl: './tela-login.component.scss'
})
export class TelaLoginComponent {

  formularioUser !: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private user: UsuariosService
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

  loginUsuario() {
    if(this.formularioUser.valid) {

      const { email, senha } =this.formularioUser.value

      this.user.loginUsuario(email, senha).subscribe((response) => {
        console.log('Login: ',response);
        this.router.navigate(['/home'])
      })
    }
    else {
      alert("Formulário inválido")
    }
  }
}
