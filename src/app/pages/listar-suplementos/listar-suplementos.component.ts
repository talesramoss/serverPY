import { Component } from '@angular/core';
import { SuplementosService } from '../../servicos/suplementos.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

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
}
