import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SuplementosService } from '../../views/suplementos/suplementos.service';
import { Suplemento } from '../../views/interface';

@Component({
  selector: 'app-listar-suplementos',
  templateUrl: './listar-suplementos.component.html',
  styleUrl: './listar-suplementos.component.scss'
})
export class ListarSuplementosComponent {

  listarSuplemento: any

  constructor (
    private suplementoService: SuplementosService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.suplementoService.listSuplementos().subscribe((suplementos) => {
      this.listarSuplemento = suplementos
      console.log(this.listarSuplemento);
    })
  }

  cadastrar() {
    this.router.navigate(['/cadastrarSuplemento'])
  }

  editar() {

    this.router.navigate(['editarSuplemento'])
  }

  excluir() {
    this.router.navigate(['/excluirSuplemento'])
  }
}
