import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuplementosService } from '../../views/suplementos/suplementos.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.scss']
})
export class ExcluirComponent implements OnInit {
  suplementoId: number | null = null; // Declaração da variável suplementoId

  constructor(
    private router: Router,
    private service: SuplementosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.suplementoId = id ? Number(id) : null;

    if (!this.suplementoId) {
      console.error('ID inválido ou não encontrado na rota.');
      alert('ID inválido ou não encontrado!');
      this.router.navigate(['/listarSuplementos']); // Redireciona em caso de erro
    }
  }

  excluir(): void {
    if (this.suplementoId !== null) {
      this.service.deleteSuplemento(this.suplementoId).subscribe({
        next: () => {
          console.log('Suplemento excluído com sucesso!');
          alert('Suplemento excluído com sucesso!');
          this.router.navigate(['/listarSuplementos']); // Redireciona após exclusão
        },
        error: (err) => {
          console.error('Erro ao excluir o suplemento:', err);
          alert('Erro ao excluir o suplemento. Tente novamente.');
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/listarSuplementos']); // Redireciona ao cancelar
  }
}
