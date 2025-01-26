import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuplementosService } from '../../views/suplementos/suplementos.service';

@Component({
  selector: 'app-listar-suplementos',
  templateUrl: './listar-suplementos.component.html',
  styleUrls: ['./listar-suplementos.component.scss'] // Corrected to styleUrls
})
export class ListarSuplementosComponent {
  listarSuplemento: any;

  constructor(
    private suplementoService: SuplementosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.suplementoService.listSuplementos().subscribe((suplementos) => {
      this.listarSuplemento = suplementos;
      console.log(this.listarSuplemento);
    });
  }

  cadastrar() {
    this.router.navigate(['/cadastrarSuplemento']);
  }

  editar(suplementoId: number) { // Accept suplementoId as a parameter
    this.router.navigate(['/editar', suplementoId]); // Pass the ID
  }

  excluir() {
    this.router.navigate(['/excluirSuplemento']);
  }
}
