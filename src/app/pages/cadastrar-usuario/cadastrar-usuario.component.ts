import { Component } from '@angular/core';
import { UsuariosService } from '../../views/usuarios/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.scss'
})
export class CadastrarUsuarioComponent {

  formUser !: FormGroup

  constructor(
    private user: UsuariosService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void{
    this.formUser = this.fb.group({
      id: [0],
      nome: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      telefone: ['', Validators.compose([Validators.required])],
      senha: ['', Validators.compose([Validators.required])]
    })
  }

  criarUsuario() {
    if(this.formUser.valid){
      this.user.criarUsuario(this.formUser.value).subscribe(() => {
        console.log('info user: ', this.formUser.value);
        this.router.navigate(['/login'])
      })
    }
  }

  entrar(){
    this.router.navigate(['/login'])
  }
}
